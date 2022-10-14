import { Auth } from '@application/api/auth/decorator/auth.decorator';
import { CurrentUser } from '@application/api/auth/decorator/user.decorator';
import { CreateUserBodyDto } from '@application/api/domain/user/dto/create-user.dto';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user/create-user.usercase';
import { UserModelDto } from '@core/domain/user/user.dto';
import { User } from '@core/domain/user/user.model';
import { Role } from '@core/enum/role.enum';
import { CreateUserAdapter } from '@infra/adapter/usecase/user/create-user.adapter';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

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

  @Auth(Role.USER)
  @Get('me')
  async getMe(@CurrentUser() user: User) {
    return UserModelDto.fromModel(user);
  }
}
