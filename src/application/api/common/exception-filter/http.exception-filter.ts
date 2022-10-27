import { ApiResponse } from '@application/api/common/dto/api-response.dto';
import { ValidationException } from '@core/common/exception/validation.exception';
import { Config } from '@infra/config/config';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService<Config>) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const httpHost = host.switchToHttp();
    const res: Response = httpHost.getResponse();

    this.logging(exception);

    const errorResponse = ApiResponse.error(exception);

    res.status(errorResponse.statusCode).json(errorResponse);
  }

  private logging(exception: HttpException) {
    if (this.configService.get('API_LOG_ENABLE')) {
      this.defaultLogging(exception);

      if (exception instanceof ValidationException) {
        this.validationLogging(exception);
      }
    }
  }

  private defaultLogging(exception: HttpException) {
    Logger.error(`[${exception.getStatus()}] ${exception.message}`);
  }

  private validationLogging(exception: ValidationException) {
    const response = exception.getResponse() as {
      message: ValidationError[];
    };

    for (const msg of response.message) {
      Logger.error(msg);
    }
  }
}
