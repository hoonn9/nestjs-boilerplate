import { User } from '@core/domain/user/user.model';
import { plainToInstance } from 'class-transformer';

export class UserModelDto {
  id: string;

  static fromModel(model: User): UserModelDto {
    const properties = model.get();
    const plain = {
      id: properties.id,
    };

    return plainToInstance(UserModelDto, plain);
  }
}
