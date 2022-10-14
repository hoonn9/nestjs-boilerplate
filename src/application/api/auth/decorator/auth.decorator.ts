import { RoleGuard } from '@application/api/auth/guard/role.guard';
import { Role } from '@core/enum/role.enum';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (...roles: Role[]) =>
  applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard('jwt'), RoleGuard),
  );
