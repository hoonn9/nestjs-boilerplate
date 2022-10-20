import { UserController } from '@application/api/domain/user/user.controller';
import { CreateUserHandler } from '@core/domain/user/usecase/create-user/create-user.handler';
import { BcryptCryptoHandler } from '@infra/adapter/crypto/bcrypt/bcrypt.handler';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import { TypeOrmUserRepository } from '@infra/adapter/orm/typeorm/repository/user.repository';
import { InfraInjectTokens } from '@infra/infra.token';
import { Module, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserInjectToken } from './user.token';

const persists: Provider[] = [
  {
    provide: UserInjectToken.UserRepository,
    useFactory: (repo: DataSource) => {
      return new TypeOrmUserRepository(repo.getRepository(TypeOrmUser));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: InfraInjectTokens.CryptoHandler,
    useClass: BcryptCryptoHandler,
  },
];

const useCases: Provider[] = [
  {
    provide: UserInjectToken.CreateUserUseCase,
    useFactory: (userRepository, cryptoHandler) =>
      new CreateUserHandler(userRepository, cryptoHandler),
    inject: [UserInjectToken.UserRepository, InfraInjectTokens.CryptoHandler],
  },
];

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...persists, ...useCases],
})
export class UserModule {}
