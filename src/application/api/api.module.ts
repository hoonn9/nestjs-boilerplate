import { HttpLogInterceptor } from '@application/api/common/interceptor/http-log.interceptor';
import { UserModule } from '@application/api/domain/user/user.module';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLogInterceptor,
    },
  ],
})
export class ApiModule {}
