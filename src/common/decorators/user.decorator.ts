import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const jwtService = new JwtService();

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const header = ctx.switchToHttp().getRequest().headers['authorization'];

    if (header === null) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (header.startsWith('Bearer ')) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const token = header.substring(7, header.length);

    try {
      const user: any = jwtService.decode(token);
      return user.sub;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  },
);
