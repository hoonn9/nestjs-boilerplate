import { Config } from '@infra/config/config';
import { DatabaseConfig } from '@infra/config/database/database.config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<Config>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const dbConfig = this.configService.getOrThrow<DatabaseConfig>('database');

    return {
      type: 'mysql',
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
      keepConnectionAlive: process.env.NODE_ENV !== 'production',
      database: dbConfig.database,
      host: dbConfig.host,
      port: +dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      // entities: [`./src/**/*.entity{.ts,.js}`],
      // subscribers: ['./src/**/*.subscriber{.ts,.js}'],
    };
  }
}
