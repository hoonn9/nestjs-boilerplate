import { Module } from '@nestjs/common';
import { AppController } from '@application/api/app.controller';
import { ConfigModule } from '@infra/config/config.module';
import { UserModule } from '@application/api/domain/user/user.module';
import { InfraModule } from '@application/infra.module';

@Module({
  imports: [ConfigModule, InfraModule, UserModule],
  controllers: [AppController],
})
export class RootModule {}
