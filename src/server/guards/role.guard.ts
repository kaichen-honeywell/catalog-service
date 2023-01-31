import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../pojo/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = request.user.roles;
    const resRoles = this.reflector.get(ROLES_KEY, context.getHandler());

    if (!resRoles || resRoles.length === 0) {
      return true;
    }
    if (!roles || roles.length === 0) {
      throw new UnauthorizedException();
    }
    return roles.some((ro) => resRoles.includes(ro));
  }
}
