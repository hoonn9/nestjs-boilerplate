import { ValidationException } from '@core/common/exception/validation.exception';
import { HttpException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ApiResponse<TData> {
  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly data: TData | null = null,
  ) {}

  static success<TData>(data?: TData, message?: string) {
    return new ApiResponse(200, message || 'ok', data);
  }

  static error(exception: HttpException) {
    if (exception instanceof ValidationException) {
      const response = exception.getResponse() as {
        message: ValidationError[];
      };

      return new ApiResponse<ValidationError[]>(
        exception.getStatus(),
        exception.message,
        response.message,
      );
    }

    return new ApiResponse(exception.getStatus(), exception.message, null);
  }
}
