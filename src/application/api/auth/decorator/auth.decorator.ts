import { JwtAccessGuard } from '@application/api/auth/guard/jwt-access.guard';
import { RoleGuard } from '@application/api/auth/guard/role.guard';
import { Role } from '@core/enum/role.enum';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAccessGuard, RoleGuard),
  );
