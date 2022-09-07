import { ValidatableAdapter } from '@core/common/adapter/validatable.adapter';
import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { plainToInstance } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserAdapter
  extends ValidatableAdapter
  implements CreateUserPort
{
  @IsOptional()
  @IsString()
  password?: string;

  static async validate(port: CreateUserPort) {
    const instance = plainToInstance(CreateUserAdapter, port);
    await this.validate(instance);
    return instance;
  }
}
