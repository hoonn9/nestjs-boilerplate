import { NestApplication, NestFactory } from '@nestjs/core';
import { RootModule } from '@application/root.module';
import { ConfigService } from '@nestjs/config';
import { ApiConfig } from '@infra/config/api/api.config';
import { Config } from '@infra/config/config';
import { HttpExceptionFilter } from '@application/api/common/exception-filter/http.exception-filter';
import { Logger } from '@nestjs/common';

export class ServerApplication {
  constructor(private readonly app: NestApplication) {}

  public static async new() {
    const app = await NestFactory.create<NestApplication>(RootModule);

    return new ServerApplication(app);
  }

  public async execute() {
    const configService: ConfigService<Config> = this.app.get(ConfigService);
    const apiConfig = configService.getOrThrow<ApiConfig>('api');

    this.app.setGlobalPrefix('api');
    this.app.useGlobalFilters(new HttpExceptionFilter(configService));

    Logger.log('listening to port: ' + apiConfig.port, NestApplication.name);
    await this.app.listen(apiConfig.port);
  }
}
