import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  /*
  const currentUser = req.user as IPortalUser;
  console.log('\x1b[35m%s\x1b[0m', `Request user ... ${currentUser.userId}`);
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Request roles ... ${currentUser.roles.toString()}`,
  );
  */
  next();
};
