import { User } from '@core/domain/user/entity/user.model';
import { Optional } from '@core/type/common';

export interface UserRepositoryPort {
  findById(id: string): Promise<Optional<User>>;
  findByEmailOrPhoneNumber(args: {
    email: string;
    phoneNumber: string;
  }): Promise<User[]>;
  findByEmailWithPassword(email: string): Promise<Optional<User>>;
  save(user: User): Promise<void>;
}
