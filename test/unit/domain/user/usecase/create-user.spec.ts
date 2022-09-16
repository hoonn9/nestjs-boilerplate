import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CreateUserHandler } from '@core/domain/user/usecase/create-user/create-user.handler';
import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { UserRepositoryPort } from '@core/domain/user/user.repository';
import { Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UserModelDto } from '@core/domain/user/user.dto';
import { User } from '@core/domain/user/user.model';

const providers: Provider[] = [
  {
    provide: UserInjectToken.CreateUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) =>
      new CreateUserHandler(userRepository),
    inject: [UserInjectToken.UserRepository],
  },
  {
    provide: UserInjectToken.UserRepository,
    useValue: {},
  },
];

describe('CreateUserHandler', () => {
  let userRepository: UserRepositoryPort;
  let createUserHandler: CreateUserHandler;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers,
    }).compile();

    userRepository = module.get(UserInjectToken.UserRepository);

    createUserHandler = module.get(UserInjectToken.CreateUserUseCase);
  });

  describe('execute', () => {
    it('should execute CreateUser', async () => {
      const id = faker.datatype.uuid();

      userRepository.newId = jest.fn().mockResolvedValue(id);
      userRepository.save = jest.fn().mockResolvedValue({
        id,
      });

      const port: CreateUserPort = {};
      const user = new User({
        id,
      });

      const expectCreateUserDto = UserModelDto.fromModel(user);

      const resultCreateUserDto = await createUserHandler.execute(port);

      expect(resultCreateUserDto).toEqual(expectCreateUserDto);
    });
  });
});
