import { AuthInjectToken } from '@application/api/auth/auth.token';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard(
  AuthInjectToken.JwtRefreshTokenStrategy.toString(),
) {}
