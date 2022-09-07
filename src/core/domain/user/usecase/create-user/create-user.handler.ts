import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user/create-user.usercase';
import { UserModelDto } from '@core/domain/user/user.dto';
import { User } from '@core/domain/user/user.model';
import { UserRepositoryPort } from '@core/domain/user/user.repository';

export class CreateUserHandler implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(port: CreateUserPort): Promise<UserModelDto> {
    const id = await this.userRepository.newId();
    const userModel = new User({
      id: id,
      password: port.password,
    });
    await this.userRepository.save(userModel);

    return UserModelDto.fromModel(userModel);
  }
}
