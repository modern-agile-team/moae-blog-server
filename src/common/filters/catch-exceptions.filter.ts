import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { logger } from '../../utils/logger.util';

@Catch()
export class CatchExceptionFilter implements ExceptionFilter {
  catch(exception: any | HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    logger.error({
      url: request.method + request.originalUrl,
      body: request.body,
      value: exception.response,
      stack: exception.stack,
    });

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    return exception instanceof HttpException
      ? response.status(httpStatus).json(exception.getResponse())
      : response.status(httpStatus).json({
          description: '서버 에러입니다.',
        });
  }
}
