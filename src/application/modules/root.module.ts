import { Module } from '@nestjs/common';
import { AppController } from '@application/api/app.controller';
import { ConfigModule } from '@infra/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
})
export class RootModule {}
