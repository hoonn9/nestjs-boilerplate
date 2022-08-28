import { validate } from 'src/core/config/env-validation';
import { databaseConfigRegister } from '@infra/config/database/database.register';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from '../api/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      load: [databaseConfigRegister],
    }),
  ],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
