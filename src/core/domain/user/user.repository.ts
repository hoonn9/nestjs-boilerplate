import { User } from '@core/domain/user/user.model';
import { Optional } from '@core/type/common';

export interface UserRepositoryPort {
  findById(id: string): Promise<Optional<User>>;
  findByEmailOrPhoneNumber(args: {
    email: string;
    phoneNumber: string;
  }): Promise<User[]>;
  save(user: User): Promise<void>;
}
