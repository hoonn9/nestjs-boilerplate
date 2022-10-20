import { User } from '@core/domain/user/entity/user.model';
import { Role } from '@core/enum/role.enum';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Role[] =
      this.reflector.get<Role[]>('roles', context.getHandler()) || [];

    const request: Request & { user: User | null } = context
      .switchToHttp()
      .getRequest();

    if (roles.length) {
      if (request.user && roles.includes(request.user.get().role)) {
        return true;
      }
    }

    throw new UnauthorizedException();
  }
}
