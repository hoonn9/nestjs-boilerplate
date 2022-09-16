import { InfraTokens } from '@infra/infra.token';
import { TypeOrmDatabaseHandler } from '@infra/adapter/orm/typeorm/typeorm.handler';
import { TypeOrmModule } from '@infra/adapter/orm/typeorm/typeorm.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule],
  providers: [
    {
      provide: InfraTokens.DatabaseHandler,
      useClass: TypeOrmDatabaseHandler,
    },
  ],
  exports: [InfraTokens.DatabaseHandler],
})
export class InfraModule {}
