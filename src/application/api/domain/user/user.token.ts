export class UserInjectToken {
  public static readonly CreateUserUseCase = Symbol('CreateUserUseCase');
  public static readonly UpdateRefreshTokenUseCase = Symbol(
    'UpdateRefreshTokenUseCase',
  );

  public static readonly UserRepository = Symbol('UserRepository');
  public static readonly RefreshTokenRepository = Symbol(
    'RefreshTokenRepository',
  );
}
