import { AuthModule } from '@application/api/auth/auth.module';
import { HttpLogInterceptor } from '@application/api/common/interceptor/http-log.interceptor';
import { UserModule } from '@application/api/domain/user/user.module';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [AuthModule, UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpLogInterceptor,
    },
  ],
})
export class ApiModule {}
