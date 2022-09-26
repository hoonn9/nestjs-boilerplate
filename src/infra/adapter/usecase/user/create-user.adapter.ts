import { ValidatableAdapter } from '@core/common/adapter/validatable.adapter';
import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { plainToInstance } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserAdapter
  extends ValidatableAdapter
  implements CreateUserPort
{
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsDate()
  birth?: Date;

  @IsString()
  phoneNumber: string;

  static async toPort(port: CreateUserPort) {
    const instance = plainToInstance(CreateUserAdapter, port);

    await instance.validate();
    return instance;
  }
}
