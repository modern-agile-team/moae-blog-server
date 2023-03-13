import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constant';

export const Roles = (role: number) => SetMetadata(ROLES_KEY, role);
