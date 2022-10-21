import { AuthService } from '@application/api/auth/auth.service';
import { AuthInjectToken } from '@application/api/auth/auth.token';
import { JwtPayload } from '@application/api/auth/type/jwt.type';
import { User } from '@core/domain/user/entity/user.model';
import { AuthConfig } from '@infra/config/auth/auth.config';
import { Config } from '@infra/config/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  AuthInjectToken.JwtAccessTokenStrategy.toString(),
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const name =
            configService.getOrThrow<AuthConfig>('auth').jwt.access.cookieName;

          return req.cookies?.[name];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.getOrThrow<AuthConfig>('auth').jwt.access.secret,
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const user = await this.authService.getUserByPayload(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
