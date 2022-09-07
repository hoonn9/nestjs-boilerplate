import { Config } from '@infra/config/config';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService<Config>) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
