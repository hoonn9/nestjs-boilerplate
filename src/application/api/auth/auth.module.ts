import { AuthController } from '@application/api/auth/auth.controller';
import { AuthService } from '@application/api/auth/auth.service';
import { JwtAccessStrategy } from '@application/api/auth/strategy/auth-access-jwt.strategy';
import { LocalStrategy } from '@application/api/auth/strategy/auth-local.strategy';
import { JwtRefreshStrategy } from '@application/api/auth/strategy/auth-refresh-jwt.strategy';
import { UserInjectToken } from '@application/api/domain/user/user.token';
import { UpdateRefreshTokenHandler } from '@core/domain/user/usecase/update-refresh-token/update-refresh-token.handler';
import { BcryptCryptoHandler } from '@infra/adapter/crypto/bcrypt/bcrypt.handler';
import { TypeOrmRefreshToken } from '@infra/adapter/orm/typeorm/entity/refresh-token.entity';
import { TypeOrmUser } from '@infra/adapter/orm/typeorm/entity/user.entity';
import { TypeOrmRefreshTokenRepository } from '@infra/adapter/orm/typeorm/repository/refresh-token.repository';
import { TypeOrmUserRepository } from '@infra/adapter/orm/typeorm/repository/user.repository';
import { InfraInjectTokens } from '@infra/infra.token';
import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const useCases: Provider[] = [
  {
    provide: UserInjectToken.UpdateRefreshTokenUseCase,
    useFactory: (repo) => {
      return new UpdateRefreshTokenHandler(repo);
    },
    inject: [UserInjectToken.RefreshTokenRepository],
  },
];

const persists: Provider[] = [
  {
    provide: UserInjectToken.UserRepository,
    useFactory: (dataSource: DataSource) => {
      return new TypeOrmUserRepository(dataSource.getRepository(TypeOrmUser));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: UserInjectToken.RefreshTokenRepository,
    useFactory: (dataSource: DataSource) => {
      return new TypeOrmRefreshTokenRepository(
        dataSource.getRepository(TypeOrmRefreshToken),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: InfraInjectTokens.CryptoHandler,
    useClass: BcryptCryptoHandler,
  },
];

const strategies: Provider[] = [
  LocalStrategy,
  JwtAccessStrategy,
  JwtRefreshStrategy,
];

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, ...persists, ...strategies, ...useCases],
  controllers: [AuthController],
})
export class AuthModule {}
