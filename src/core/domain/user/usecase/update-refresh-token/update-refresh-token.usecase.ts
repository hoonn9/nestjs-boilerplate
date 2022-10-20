import { RefreshToken } from '@core/domain/user/entity/refresh-token.model';
import { UpdateRefreshTokenPort } from '@core/domain/user/usecase/update-refresh-token/update-refresh-token.port';

export interface UpdateRefreshTokenUseCase {
  execute(port: UpdateRefreshTokenPort): Promise<RefreshToken>;
}
