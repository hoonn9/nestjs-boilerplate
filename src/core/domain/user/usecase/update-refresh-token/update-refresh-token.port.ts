import { User } from '@core/domain/user/entity/user.model';

export interface UpdateRefreshTokenPort {
  user: User;
  token?: string;
  newToken: string;
}
