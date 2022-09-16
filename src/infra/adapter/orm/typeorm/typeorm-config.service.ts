import { Config } from '@infra/config/config';
import { DatabaseConfig } from '@infra/config/database/database.config';
import { Environment } from '@infra/config/env-variable';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<Config>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = this.configService.getOrThrow<DatabaseConfig>('database');

    const env = this.configService.getOrThrow<Environment>('NODE_ENV');
    switch (env) {
      case Environment.Production:
        return {
          type: 'mysql',
          synchronize: true,
          logging: true,
          keepConnectionAlive: true,
          database: dbConfig.database,
          host: dbConfig.host,
          port: +dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          subscribers: [`${__dirname}/**/*.subscriber{.ts,.js}`],
        };
      case Environment.Test:
        return {
          type: 'mysql',
          synchronize: true,
          logging: false,
          keepConnectionAlive: true,
          dropSchema: true,
          database: dbConfig.database,
          host: dbConfig.host,
          port: +dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          subscribers: [`${__dirname}/**/*.subscriber{.ts,.js}`],
        };
      case Environment.Production:
        return {
          type: 'mysql',
          synchronize: false,
          logging: false,
          keepConnectionAlive: false,
          database: dbConfig.database,
          host: dbConfig.host,
          port: +dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          subscribers: [`${__dirname}/**/*.subscriber{.ts,.js}`],
        };
      default:
        throw new Error(`${env} value of env file is not NODE_ENV variable.`);
    }
  }
}
