import { CryptoHandler } from '@core/common/handler/crypto/crypto.handler';
import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user/create-user.usercase';
import { UserModelDto } from '@core/domain/user/user.dto';
import { User } from '@core/domain/user/user.model';
import { UserRepositoryPort } from '@core/domain/user/user.repository';

export class CreateUserHandler implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly cryptoHandler: CryptoHandler,
  ) {}

  async execute(port: CreateUserPort): Promise<UserModelDto> {
    let password: string | null = null;

    if (port.password) {
      password = await this.cryptoHandler.hash(port.password);
    }

    const userModel = new User({
      password: password,
      email: port.email,
      phoneNumber: port.phoneNumber,
      birthDate: port.birthDate,
    });
    await this.userRepository.save(userModel);

    return UserModelDto.fromModel(userModel);
  }
}
