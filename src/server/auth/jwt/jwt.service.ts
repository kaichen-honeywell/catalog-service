import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IPortalUser } from '../../../pojo';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: IPortalUser) {
    const payload: JwtPayload = { username: user.userName, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
