import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest().user;
  return { userId: +user.sub, ...user } ?? null;
});
