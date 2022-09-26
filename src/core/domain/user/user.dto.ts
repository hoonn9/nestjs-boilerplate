import { User } from '@core/domain/user/user.model';
import { Exclude, plainToInstance } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserModelDto {
  @IsNotEmpty()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @Exclude()
  password: string | null;

  @IsDate()
  @IsOptional()
  birthDate: Date | null;

  static fromModel(model: User): UserModelDto {
    const properties = model.get();
    const plain = {
      id: properties.id,
      email: properties.email,
      birthDate: properties.birthDate,
      phoneNumber: properties.phoneNumber,
    };

    return plainToInstance(UserModelDto, plain);
  }
}
