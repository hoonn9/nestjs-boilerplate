import { RefreshToken } from '@core/domain/user/entity/refresh-token.model';
import { User } from '@core/domain/user/entity/user.model';
import { Optional } from '@core/type/common';

export interface RefreshTokenRepositoryPort {
  findByToken(args: {
    user: User;
    token: string;
  }): Promise<Optional<RefreshToken>>;
  save(refreshToken: RefreshToken): Promise<void>;
}
