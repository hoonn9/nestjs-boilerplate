import { CoreModel } from '@core/common/model/core.model';
import {
  UserConstructorProperties,
  UserProperties,
} from '@core/domain/user/user.type';

export class User extends CoreModel<string> {
  private password: string | null = null;

  constructor(properties: UserConstructorProperties) {
    super(properties.id);
    this.password = properties.password || null;
  }

  get(): UserProperties {
    return {
      id: this.id,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static toModel(properties: UserProperties): User {
    return new User(properties);
  }
}
