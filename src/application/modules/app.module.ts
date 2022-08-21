import loadConfig from '@infra/config/load';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '../api/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
