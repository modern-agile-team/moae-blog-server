import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(NotFoundException)
export class HttpNotFoundFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    this.logger.error(exception);

    response.status(HttpStatus.NOT_FOUND).json(exception.getResponse());
  }
}
