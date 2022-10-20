import { CoreModel } from '@core/common/model/core.model';
import {
  UserConstructorProperties,
  UserProperties,
} from '@core/domain/user/type/user.type';
import { Role } from '@core/enum/role.enum';

export class User extends CoreModel<string> {
  private email: string;
  private password: string | null = null;
  private birthDate: Date | null = null;
  private phoneNumber: string;
  private role: Role;

  constructor(properties: UserConstructorProperties) {
    super(properties.id);
    this.email = properties.email;
    this.phoneNumber = properties.phoneNumber;
    this.password = properties.password || null;
    this.birthDate = properties.birthDate || null;
    this.role = properties.role;
  }

  get(): UserProperties {
    return {
      id: this.id,
      email: this.email,
      birthDate: this.birthDate,
      phoneNumber: this.phoneNumber,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static toModel(properties: UserProperties): User {
    return new User(properties);
  }
}
