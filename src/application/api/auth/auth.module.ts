import { AuthController } from '@application/api/auth/auth.controller';
import { AuthService } from '@application/api/auth/auth.service';
import { LocalStrategy } from '@application/api/auth/strategy/auth-local.strategy';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { BcryptCryptoHandler } from '@infra/adapter/crypto/bcrypt/bcrypt.handler';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import { TypeOrmUserRepository } from '@infra/adapter/orm/typeorm/repository/user.repository';
import { InfraInjectTokens } from '@infra/infra.token';
import { Module, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const persist: Provider[] = [
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

const strategies: Provider[] = [LocalStrategy];

@Module({
  providers: [AuthService, ...persist, ...strategies],
  controllers: [AuthController],
})
export class AuthModule {}
