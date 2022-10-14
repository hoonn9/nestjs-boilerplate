import { AuthService } from '@application/api/auth/auth.service';
import { JwtPayload } from '@application/api/auth/type/jwt-payload';
import { User } from '@core/domain/user/user.model';
import { AuthConfig } from '@infra/config/auth/auth.config';
import { Config } from '@infra/config/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const key = configService.getOrThrow<AuthConfig>('auth').jwt.key;

          return req.cookies?.[key];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<AuthConfig>('auth').jwt.secret,
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    console.log(payload);
    const user = await this.authService.getUserByPayload(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
