import { CoreModel } from '@core/common/model/core.model';
import { User } from '@core/domain/user/entity/user.model';
import {
  RefreshTokenConstructorProperties,
  RefreshTokenProperties,
  RefreshTokenUpdateProperties,
} from '@core/domain/user/type/refresh-token.type';

export class RefreshToken extends CoreModel<string> {
  private token: string;
  private user: User;

  constructor(properties: RefreshTokenConstructorProperties) {
    super(properties.id);

    this.token = properties.token;
    this.user = properties.user;
  }

  get(): RefreshTokenProperties {
    return {
      id: this.id,
      token: this.token,
      user: this.user,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  update(properties: RefreshTokenUpdateProperties) {
    if (properties.token) {
      this.token = properties.token;
    }
  }

  static toModel(properties: RefreshTokenProperties): RefreshToken {
    return new RefreshToken(properties);
  }
}
