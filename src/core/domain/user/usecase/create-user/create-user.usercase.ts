import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { UserModelDto } from '@core/domain/user/user.dto';

export interface CreateUserUseCase {
  execute(port: CreateUserPort): Promise<UserModelDto>;
}
