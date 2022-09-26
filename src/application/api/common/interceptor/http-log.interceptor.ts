import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLogInterceptor implements NestInterceptor {
  intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const httpHost = ctx.switchToHttp();

    const req: Request = httpHost.getRequest();
    const res: Response = httpHost.getResponse();

    const userAgent = req.get('user-agent') || '';

    return next.handle().pipe(
      tap(() => {
        const { method, originalUrl, ip } = req;
        const { statusCode } = res;
        const contentLength = req.get('content-length');

        Logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
        );
      }),
    );
  }
}
