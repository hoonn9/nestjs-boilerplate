import { CreateUserBodyDto } from '@application/api/domain/user/dto/create-user.dto';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user/create-user.usercase';
import { UserModelDto } from '@core/domain/user/user.dto';
import { CreateUserAdapter } from '@infra/adapter/usecase/user/create-user.adapter';
import { Body, Controller, Inject, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserInjectToken.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserBodyDto): Promise<UserModelDto> {
    const port = await CreateUserAdapter.toPort(body);
    return this.createUserUseCase.execute(port);
  }
}
