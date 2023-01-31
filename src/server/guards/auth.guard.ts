import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (validateRequest(request)) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}

const validateRequest = (req) => {
  return req.user && req.user.roles && req.user.roles.length > 0;
};
