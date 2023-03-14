import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientUnknownRequestError)
export class PrismaUnKnownFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    this.logger.error(exception);

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '서버 에러입니다.' });
  }
}
