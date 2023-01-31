import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESSION_COOKIE_KEY } from '../../../pojo/constants';
import { IPortalUser } from '../../../pojo';

export type JwtPayload = { sub: string; username: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const extractJwtFromCookieOrAuthHeader = (req) => {
      let token = null;

      if (req && req.cookies) {
        token = req.cookies[SESSION_COOKIE_KEY];
      }
      if (
        !token &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        token = req.headers.authorization.split(' ')[1];
      }
      return token;
    };

    super({
      jwtFromRequest: extractJwtFromCookieOrAuthHeader,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      algorithms: configService.get<string>('JWT_ALGO'),
      jsonWebTokenOptions: {
        maxAge: configService.get<string>('JWT_EXPIRES_IN'),
      },
    });
  }

  async validate(payload: JwtPayload): Promise<IPortalUser> {
    return Promise.resolve(mockUserFinder(payload.username));
  }
}

const mockUserFinder = (uname) => {
  const users = [
    { userId: '11111111', userName: 'tester@honeywell.com', roles: ['dev'] },
    {
      userId: '88888888',
      userName: 'kai.chen2@honeywell.com',
      roles: ['admin'],
    },
  ];

  return users.find((u) => u.userName === uname) as IPortalUser;
};
