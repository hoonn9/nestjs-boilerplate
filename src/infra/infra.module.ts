import { InfraInjectTokens } from '@infra/infra.token';
import { TypeOrmDatabaseHandler } from '@infra/adapter/orm/typeorm/typeorm.handler';
import { TypeOrmModule } from '@infra/adapter/orm/typeorm/typeorm.module';
import { Module, Provider } from '@nestjs/common';

const handlers: Provider[] = [
  {
    provide: InfraInjectTokens.DatabaseHandler,
    useClass: TypeOrmDatabaseHandler,
  },
];

@Module({
  imports: [TypeOrmModule],
  providers: [...handlers],
  exports: [InfraInjectTokens.DatabaseHandler],
})
export class InfraModule {}
