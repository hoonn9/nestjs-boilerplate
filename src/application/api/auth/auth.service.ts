import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CryptoHandler } from '@core/common/handler/crypto/crypto.handler';
import { UserRepositoryPort } from '@core/domain/user/user.repository';
import { InfraInjectTokens } from '@infra/infra.token';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserInjectToken.UserRepository)
    private readonly userRepository: UserRepositoryPort,

    @Inject(InfraInjectTokens.CryptoHandler)
    private readonly cryptoHandler: CryptoHandler,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    const properties = user.get();

    if (properties.password == null) {
      return null;
    }

    const validate = await this.cryptoHandler.compare(
      password,
      properties.password,
    );

    if (!validate) {
      return null;
    }

    return user;
  }
}
