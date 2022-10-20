import { UserInjectToken } from '@application/api/domain/user/user.token';
import { CreateUserHandler } from '@core/domain/user/usecase/create-user/create-user.handler';
import { CreateUserPort } from '@core/domain/user/usecase/create-user/create-user.port';
import { UserRepositoryPort } from '@core/domain/user/repository/user.repository';
import { Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UserModelDto } from '@core/domain/user/dto/user.dto';
import { User } from '@core/domain/user/entity/user.model';
import { InfraInjectTokens } from '@infra/infra.token';
import { CryptoHandler } from '@core/common/handler/crypto/crypto.handler';
import { Role } from '@core/enum/role.enum';

const providers: Provider[] = [
  {
    provide: UserInjectToken.CreateUserUseCase,
    useFactory: (
      userRepository: UserRepositoryPort,
      cryptoHandler: CryptoHandler,
    ) => new CreateUserHandler(userRepository, cryptoHandler),
    inject: [UserInjectToken.UserRepository, InfraInjectTokens.CryptoHandler],
  },
  {
    provide: UserInjectToken.UserRepository,
    useValue: {},
  },
  {
    provide: InfraInjectTokens.CryptoHandler,
    useValue: {},
  },
];

describe('CreateUserHandler', () => {
  let userRepository: UserRepositoryPort;
  let createUserHandler: CreateUserHandler;
  let cryptoHandler: CryptoHandler;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers,
    }).compile();

    userRepository = module.get(UserInjectToken.UserRepository);
    createUserHandler = module.get(UserInjectToken.CreateUserUseCase);
    cryptoHandler = module.get(InfraInjectTokens.CryptoHandler);
  });

  describe('execute', () => {
    it('should execute CreateUser', async () => {
      const id = faker.datatype.uuid();

      userRepository.findByEmailOrPhoneNumber = jest.fn().mockResolvedValue([]);
      userRepository.save = jest.fn().mockResolvedValue({
        id,
      });

      cryptoHandler.hash = jest.fn().mockResolvedValue('password');

      const port: CreateUserPort = {
        email: faker.internet.email(),
        birthDate: faker.date.birthdate(),
        phoneNumber: faker.phone.number(),
        password: faker.internet.password(),
      };

      const user = new User({
        id,
        email: port.email,
        birthDate: port.birthDate,
        phoneNumber: port.phoneNumber,
        password: port.password,
        role: Role.USER,
      });

      const expectCreateUserDto = UserModelDto.fromModel(user);
      const resultCreateUserDto = await createUserHandler.execute(port);

      resultCreateUserDto.id = user.get().id;

      expect(resultCreateUserDto).toEqual(expectCreateUserDto);
    });
  });
});
