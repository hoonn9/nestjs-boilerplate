import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@application/api/auth/auth.service';
import { User } from '@core/domain/user/entity/user.model';
import { AuthInjectToken } from '@application/api/auth/auth.token';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  AuthInjectToken.LocalStrategy.toString(),
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
