import {
  JwtPayload,
  JwtToken,
  JwtType,
} from '@application/api/auth/type/jwt.type';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CryptoService } from '@core/crypto/crypto.service';
import { UserModelDto } from '@core/domain/user/dto/user.dto';
import { User } from '@core/domain/user/entity/user.model';
import { RefreshTokenRepositoryPort } from '@core/domain/user/repository/refresh-token.repository';
import { UserRepositoryPort } from '@core/domain/user/repository/user.repository';
import { UpdateRefreshTokenUseCase } from '@core/domain/user/usecase/update-refresh-token/update-refresh-token.usecase';
import { AuthConfig } from '@infra/config/auth/auth.config';
import { Config } from '@infra/config/config';
import { Environment } from '@infra/config/env-variable';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Request, Response } from 'express';

@Injectable()
export class AuthService {
  private readonly authConfig: AuthConfig;
  constructor(
    @Inject(UserInjectToken.UserRepository)
    private readonly userRepository: UserRepositoryPort,

    @Inject(UserInjectToken.RefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,

    @Inject(UserInjectToken.UpdateRefreshTokenUseCase)
    private readonly updateRefreshTokenUseCase: UpdateRefreshTokenUseCase,

    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.authConfig = this.configService.getOrThrow<AuthConfig>('auth');
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    const properties = user.get();

    if (properties.password == null) {
      return null;
    }

    const validate = await this.cryptoService.compareByBcrypt(
      password,
      properties.password,
    );

    if (!validate) {
      return null;
    }

    return user;
  }

  async login(user: User, res: Response) {
    const payload: JwtPayload = {
      id: user.get().id,
    };

    const newAccessToken = this.generateToken(payload, 'access');
    const newRefreshToken = this.generateToken(payload, 'refresh');

    await this.updateRefreshTokenUseCase.execute({
      newToken: await this.hashToken(newRefreshToken),
      user,
    });

    this.setRefreshToken(res, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return UserModelDto.fromModel(user);
  }

  async refreshTokens(
    payload: JwtPayload,
    req: Request,
  ): Promise<[JwtToken, User]> {
    const user = await this.userRepository.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    const token: string = req.cookies[this.authConfig.jwt.refresh.cookieName];

    const refreshTokenModel = await this.refreshTokenRepository.findByToken({
      user,
      token: await this.hashToken(token),
    });

    if (!refreshTokenModel) {
      throw new UnauthorizedException();
    }
    const newPayload = {
      id: payload.id,
    };

    const newAccessToken = this.generateToken(newPayload, 'access');
    const newRefreshToken = this.generateToken(newPayload, 'refresh');

    // Refresh Token Rotation
    await this.updateRefreshTokenUseCase.execute({
      token,
      newToken: await this.hashToken(newRefreshToken),
      user,
    });

    return [
      {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      user,
    ];
  }

  async getUserByPayload(payload: JwtPayload) {
    return this.userRepository.findById(payload.id);
  }

  setRefreshToken(res: Response, tokens: JwtToken) {
    this.setCookieToken(res, tokens.accessToken, 'access');
    this.setCookieToken(res, tokens.refreshToken, 'refresh');
  }

  private async hashToken(token: string) {
    return this.cryptoService.hashBySha256(token);
  }

  private setCookieToken(res: Response, token: string, type: keyof JwtType) {
    res.cookie(
      this.authConfig.jwt[type].cookieName,
      token,
      this.getCookieOptions(),
    );
  }

  private getCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure:
        this.configService.getOrThrow('NODE_ENV') === Environment.Production,
    };
  }

  private generateToken(payload: JwtPayload, type: keyof JwtType) {
    return this.jwtService.sign(payload, {
      secret: this.authConfig.jwt[type].secret,
      expiresIn: this.authConfig.jwt[type].expiresIn,
    });
  }
}
