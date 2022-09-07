import { CreateUserDto } from '@application/api/domain/user/dto/create-user.dto';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user/create-user.usercase';
import { CreateUserAdapter } from '@infra/adapter/usecase/user/create-user.adapter';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserInjectToken.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const instance = await CreateUserAdapter.validate(body);
    return this.createUserUseCase.execute(instance);
  }
}
