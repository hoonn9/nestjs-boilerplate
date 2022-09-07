import { User } from '@core/domain/user/user.model';
import { Optional } from '@core/type/common';

export interface UserRepositoryPort {
  newId(): Promise<string>;
  findById(id: string): Promise<Optional<User>>;
  save(user: User): Promise<void>;
}
