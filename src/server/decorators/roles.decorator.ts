import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../../pojo/constants';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
