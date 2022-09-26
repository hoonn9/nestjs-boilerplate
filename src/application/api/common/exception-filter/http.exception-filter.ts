import { CoreApiResponse } from '@core/api/core-api-response';
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
    const isLogging = this.configService.get('API_LOG_ENABLE');

    if (isLogging) {
      Logger.error(`[${exception.getStatus()}] ${exception.message}`);
    }

    const errRes = this.errorResponse(exception, isLogging);

    res.status(errRes.statusCode).json({
      statusCode: errRes.statusCode,
      message: errRes.message,
      data: errRes.data,
    });
  }

  private errorResponse(exception: HttpException, isLogging: boolean) {
    if (exception instanceof ValidationException) {
      const response = exception.getResponse() as {
        message: ValidationError[];
      };

      if (isLogging) {
        for (const msg of response.message) {
          Logger.error(msg);
        }
      }

      return new CoreApiResponse<ValidationError[]>(
        exception.getStatus(),
        exception.message,
        response.message,
      );
    }
    return new CoreApiResponse(exception.getStatus(), exception.message, null);
  }
}
