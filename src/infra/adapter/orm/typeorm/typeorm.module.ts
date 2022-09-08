import { TypeOrmConfigService } from '@infra/adapter/orm/typeorm/typeorm-config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BaseTypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class TypeOrmModule {}
