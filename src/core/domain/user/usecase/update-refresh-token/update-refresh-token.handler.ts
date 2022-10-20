import { RefreshToken } from '@core/domain/user/entity/refresh-token.model';
import { RefreshTokenRepositoryPort } from '@core/domain/user/repository/refresh-token.repository';
import { UpdateRefreshTokenPort } from '@core/domain/user/usecase/update-refresh-token/update-refresh-token.port';

export class UpdateRefreshTokenHandler {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepositoryPort,
  ) {}

  async execute(port: UpdateRefreshTokenPort) {
    let refreshToken = await this.refreshTokenRepository.findByUserAgent({
      user: port.user,
      userAgent: port.userAgent,
    });

    if (refreshToken) {
      refreshToken.update({
        token: port.token,
      });
    } else {
      refreshToken = new RefreshToken({
        id: RefreshToken.newId(),
        token: port.token,
        user: port.user,
        userAgent: port.userAgent,
      });
    }

    await this.refreshTokenRepository.save(refreshToken);

    return refreshToken;
  }
}
