import { UserController } from '@application/api/domain/user/user.controller';
import { CryptoService } from '@core/crypto/crypto.service';
import { CreateUserHandler } from '@core/domain/user/usecase/create-user/create-user.handler';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import { TypeOrmUserRepository } from '@infra/adapter/orm/typeorm/repository/user.repository';
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
  CryptoService,
];

const useCases: Provider[] = [
  {
    provide: UserInjectToken.CreateUserUseCase,
    useFactory: (userRepository, cryptoService) =>
      new CreateUserHandler(userRepository, cryptoService),
    inject: [UserInjectToken.UserRepository, CryptoService],
  },
];

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...persists, ...useCases],
})
export class UserModule {}
