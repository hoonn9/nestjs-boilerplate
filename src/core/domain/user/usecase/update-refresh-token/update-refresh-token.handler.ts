import { RefreshToken } from '@core/domain/user/entity/refresh-token.model';
import { RefreshTokenRepositoryPort } from '@core/domain/user/repository/refresh-token.repository';
import { UpdateRefreshTokenPort } from '@core/domain/user/usecase/update-refresh-token/update-refresh-token.port';

export class UpdateRefreshTokenHandler {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async execute(port: UpdateRefreshTokenPort) {
    let refreshToken: RefreshToken | null = null;

    if (port.token) {
      refreshToken = await this.refreshTokenRepository.findByToken({
        user: port.user,
        token: port.token,
      });
    }

    if (refreshToken) {
      refreshToken.update({
        token: port.newToken,
      });
    } else {
      refreshToken = new RefreshToken({
        id: RefreshToken.newId(),
        token: port.newToken,
        user: port.user,
      });
    }

    await this.refreshTokenRepository.save(refreshToken);

    return refreshToken;
  }
}
