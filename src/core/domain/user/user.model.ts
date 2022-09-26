import { CoreModel } from '@core/common/model/core.model';
import {
  UserConstructorProperties,
  UserProperties,
} from '@core/domain/user/user.type';
import { v4 } from 'uuid';

export class User extends CoreModel<string> {
  private email: string;
  private password: string | null = null;
  private birthDate: Date | null = null;
  private phoneNumber: string;

  constructor(properties: UserConstructorProperties) {
    super(v4());

    this.email = properties.email;
    this.phoneNumber = properties.phoneNumber;
    this.password = properties.password || null;
    this.birthDate = properties.birthDate || null;
  }

  get(): UserProperties {
    return {
      id: this.id,
      email: this.email,
      birthDate: this.birthDate,
      phoneNumber: this.phoneNumber,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static toModel(properties: UserProperties): User {
    return new User(properties);
  }
}
