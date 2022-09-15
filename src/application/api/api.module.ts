import { UserModule } from '@application/api/domain/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
})
export class ApiModule {}
