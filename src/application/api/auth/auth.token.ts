export class AuthInjectToken {
  public static readonly LocalStrategy = Symbol('local');

  public static readonly JwtAccessTokenStrategy = Symbol('jwt-access');

  public static readonly JwtRefreshTokenStrategy = Symbol('jwt-refresh');
}
