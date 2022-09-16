import { Module } from '@nestjs/common';
import { ConfigModule } from '@infra/config/config.module';
import { InfraModule } from '@infra/infra.module';
import { ApiModule } from '@application/api/api.module';

@Module({
  imports: [ConfigModule, InfraModule, ApiModule],
})
export class RootModule {}
