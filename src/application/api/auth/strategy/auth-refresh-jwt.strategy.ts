import { AuthService } from '@application/api/auth/auth.service';
import { AuthInjectToken } from '@application/api/auth/auth.token';
import { JwtPayload, JwtToken } from '@application/api/auth/type/jwt.type';
import { User } from '@core/domain/user/entity/user.model';
import { AuthConfig } from '@infra/config/auth/auth.config';
import { Config } from '@infra/config/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  AuthInjectToken.JwtRefreshTokenStrategy.toString(),
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const name =
            configService.getOrThrow<AuthConfig>('auth').jwt.refresh.cookieName;

          return req.cookies?.[name];
        },
      ]),
      passReqToCallback: true,
      secretOrKey:
        configService.getOrThrow<AuthConfig>('auth').jwt.refresh.secret,
    });
  }

  public async validate(
    req: Request & { refresh: JwtToken },
    payload: JwtPayload,
  ): Promise<User> {
    const [jwtTokens, user] = await this.authService.refreshTokens(
      payload,
      req,
    );
    req.refresh = jwtTokens;

    return user;
  }
}
