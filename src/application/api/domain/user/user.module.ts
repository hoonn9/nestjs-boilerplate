import { CreateUserHandler } from '@core/domain/user/usecase/create-user/create-user.handler';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import { TypeOrmUserRepository } from '@infra/adapter/orm/typeorm/repository/user.repository';
import { Module, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserInjectToken } from './user.token';

const persist: Provider[] = [
  {
    provide: UserInjectToken.UserRepository,
    useFactory: (repo: DataSource) => {
      return new TypeOrmUserRepository(repo.getRepository(TypeOrmUser));
    },
    inject: [getDataSourceToken()],
  },
];

const useCase: Provider[] = [
  {
    provide: UserInjectToken.CreateUserUseCase,
    useFactory: (userRepository) => new CreateUserHandler(userRepository),
    inject: [UserInjectToken.UserRepository],
  },
];

@Module({
  imports: [],
  providers: [...persist, ...useCase],
})
export class UserModule {}
