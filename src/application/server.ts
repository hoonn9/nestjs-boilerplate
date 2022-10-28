import { NestApplication, NestFactory } from '@nestjs/core';
import { RootModule } from '@application/root.module';
import { ConfigService } from '@nestjs/config';
import { ApiConfig } from '@infra/config/api/api.config';
import { Config } from '@infra/config/config';
import { HttpExceptionFilter } from '@application/api/common/exception-filter/http.exception-filter';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class ServerApplication {
  constructor(private readonly app: NestApplication) {}

  public static async new() {
    const app = await NestFactory.create<NestApplication>(RootModule);
    ServerApplication.setSwagger(app);
    return new ServerApplication(app);
  }

  private static setSwagger(app: NestApplication) {
    const configService: ConfigService<Config> = app.get(ConfigService);
    const apiConfig = configService.getOrThrow<ApiConfig>('api');

    if (!apiConfig.isEnableOpenApiDocs) {
      return;
    }

    const config = new DocumentBuilder()
      .setTitle('OpenAPI Documentation')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('nestjs')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(apiConfig.openApiDocsPath, app, document);
  }

  public async execute() {
    const configService: ConfigService<Config> = this.app.get(ConfigService);
    const apiConfig = configService.getOrThrow<ApiConfig>('api');

    this.app.setGlobalPrefix('api');
    this.app.useGlobalFilters(new HttpExceptionFilter(configService));
    this.app.use(cookieParser());

    Logger.log('listening to port: ' + apiConfig.port, NestApplication.name);
    await this.app.listen(apiConfig.port);
  }
}
