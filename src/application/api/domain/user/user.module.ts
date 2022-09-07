import { CreateUserHandler } from '@core/domain/user/usecase/create-user/create-user.handler';
import { TypeOrmUserRepository } from '@infra/adapter/orm/typeorm/repository/user.repository';
import { Module, Provider } from '@nestjs/common';
import { UserInjectToken } from './user.token';

const persist: Provider[] = [
  {
    provide: UserInjectToken.UserRepository,
    useClass: TypeOrmUserRepository,
  },
];

const useCase: Provider[] = [
  {
    provide: UserInjectToken.CreateUserUseCase,
    useFactory: (userRepository) => {
      return new CreateUserHandler(userRepository);
    },
    inject: [UserInjectToken.UserRepository],
  },
];

@Module({
  imports: [],
  providers: [...persist, ...useCase],
})
export class UserModule {}
