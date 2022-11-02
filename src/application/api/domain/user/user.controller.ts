import { Auth } from '@application/api/auth/decorator/auth.decorator';
import { CurrentUser } from '@application/api/auth/decorator/user.decorator';
import { CreateUserBodyDto } from '@application/api/domain/user/dto/create-user.dto';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user/create-user.usecase';
import { UserModelDto } from '@core/domain/user/dto/user.dto';
import { User } from '@core/domain/user/entity/user.model';
import { Role } from '@core/enum/role.enum';
import { CreateUserAdapter } from '@infra/adapter/usecase/user/create-user.adapter';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@application/api/common/dto/api-response.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserInjectToken.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(
    @Body() body: CreateUserBodyDto,
  ): Promise<ApiResponse<UserModelDto>> {
    const port = await CreateUserAdapter.toPort(body);
    return ApiResponse.success(
      await this.createUserUseCase.execute(port),
      undefined,
      HttpStatus.CREATED,
    );
  }

  @Auth(Role.USER)
  @Get('me')
  async getMe(@CurrentUser() user: User): Promise<ApiResponse<UserModelDto>> {
    return ApiResponse.success(UserModelDto.fromModel(user));
  }
}
