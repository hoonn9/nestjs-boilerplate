import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { CreateUserUseCase } from '@core/domain/user/usecase/create-user/create-user.usecase';
import { UserModelDto } from '@core/domain/user/dto/user.dto';
import { User } from '@core/domain/user/entity/user.model';
import { UserRepositoryPort } from '@core/domain/user/repository/user.repository';
import { Role } from '@core/enum/role.enum';
import { BadRequestException } from '@nestjs/common';
import { CryptoService } from '@core/crypto/crypto.service';

export class CreateUserHandler implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(port: CreateUserPort): Promise<UserModelDto> {
    const exists = await this.userRepository.findByEmailOrPhoneNumber({
      email: port.email,
      phoneNumber: port.phoneNumber,
    });

    if (exists.length) {
      throw new BadRequestException(
        `email or phone number already used. you need another email or phone number.`,
      );
    }

    let password: string | null = null;

    if (port.password) {
      password = await this.cryptoService.hashByBcrypt(port.password, 10);
    }

    const userModel = new User({
      id: User.newId(),
      password: password,
      email: port.email,
      phoneNumber: port.phoneNumber,
      birthDate: port.birthDate,
      role: Role.USER,
    });

    await this.userRepository.save(userModel);

    return UserModelDto.fromModel(userModel);
  }
}
