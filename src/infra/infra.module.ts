import { InfraInjectTokens } from '@infra/infra.token';
import { TypeOrmDatabaseHandler } from '@infra/adapter/orm/typeorm/typeorm.handler';
import { TypeOrmModule } from '@infra/adapter/orm/typeorm/typeorm.module';
import { Module, Provider } from '@nestjs/common';
import { BcryptCryptoHandler } from '@infra/adapter/crypto/bcrypt/bcrypt.handler';

const handlers: Provider[] = [
  {
    provide: InfraInjectTokens.DatabaseHandler,
    useClass: TypeOrmDatabaseHandler,
  },
  {
    provide: InfraInjectTokens.CryptoHandler,
    useClass: BcryptCryptoHandler,
  },
];

@Module({
  imports: [TypeOrmModule],
  providers: [...handlers],
  exports: [InfraInjectTokens.DatabaseHandler, InfraInjectTokens.CryptoHandler],
})
export class InfraModule {}
