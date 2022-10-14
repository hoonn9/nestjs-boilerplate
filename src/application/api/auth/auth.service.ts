import { JwtPayload } from '@application/api/auth/type/jwt-payload';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CryptoHandler } from '@core/common/handler/crypto/crypto.handler';
import { UserModelDto } from '@core/domain/user/user.dto';
import { User } from '@core/domain/user/user.model';
import { UserRepositoryPort } from '@core/domain/user/user.repository';
import { AuthConfig } from '@infra/config/auth/auth.config';
import { Config } from '@infra/config/config';
import { InfraInjectTokens } from '@infra/infra.token';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserInjectToken.UserRepository)
    private readonly userRepository: UserRepositoryPort,

    @Inject(InfraInjectTokens.CryptoHandler)
    private readonly cryptoHandler: CryptoHandler,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    const properties = user.get();

    if (properties.password == null) {
      return null;
    }

    const validate = await this.cryptoHandler.compare(
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

    const authConfig = this.configService.getOrThrow<AuthConfig>('auth');
    console.log(authConfig.jwt.expiresIn);
    res.cookie(
      authConfig.jwt.key,
      this.jwtService.sign(payload, {
        expiresIn: authConfig.jwt.expiresIn,
      }),
      {},
    );

    return UserModelDto.fromModel(user);
  }

  async getUserByPayload(payload: JwtPayload) {
    return this.userRepository.findById(payload.id);
  }
}
