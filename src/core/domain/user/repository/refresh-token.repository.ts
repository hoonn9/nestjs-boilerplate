import { RefreshToken } from '@core/domain/user/entity/refresh-token.model';
import { User } from '@core/domain/user/entity/user.model';
import { Optional } from '@core/type/common';

export interface RefreshTokenRepositoryPort {
  findByUserAgent(args: {
    user: User;
    userAgent;
  }): Promise<Optional<RefreshToken>>;
  save(refreshToken: RefreshToken): Promise<void>;
}
