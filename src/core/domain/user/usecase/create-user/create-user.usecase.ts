import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { UserModelDto } from '@core/domain/user/dto/user.dto';

export interface CreateUserUseCase {
  execute(port: CreateUserPort): Promise<UserModelDto>;
}
