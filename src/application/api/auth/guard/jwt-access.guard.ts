import { AuthInjectToken } from '@application/api/auth/auth.token';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAccessGuard extends AuthGuard(
  AuthInjectToken.JwtAccessTokenStrategy.toString(),
) {}
