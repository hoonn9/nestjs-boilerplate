import { TypeOrmModule } from '@infra/adapter/orm/typeorm/typeorm.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule],
})
export class InfraModule {}
