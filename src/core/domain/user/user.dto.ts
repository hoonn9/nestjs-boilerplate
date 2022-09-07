import { User } from '@core/domain/user/user.model';

export class UserModelDto {
  id: string;

  static fromModel(model: User): UserModelDto {
    const properties = model.get();
    return {
      id: properties.id,
    };
  }
}
