import { TypeOrmConfigService } from '@infra/adapter/orm/typeorm/typeorm-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigService],
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class InfraModule {}
