import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch(InternalServerErrorException)
export class HttpInternalServerErrorFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    this.logger.error(exception);

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(exception.getResponse());
  }
}
