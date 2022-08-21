import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from 'src/application/modules/app.module';

export class ServerApplication {
  constructor(private readonly app: NestApplication) {}

  public static async new() {
    const app = await NestFactory.create<NestApplication>(AppModule);

    return new ServerApplication(app);
  }

  public async execute() {
    const configService = this.app.get(ConfigService);

    const port = configService.get('port');

    await this.app.listen(port);
  }
}
