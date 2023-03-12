import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = {
  ADMIN: 1,
  MEMBER: 2,
  BASIC_USER: 3,
};
export const Role = (role: number) => SetMetadata(ROLES_KEY, role);
