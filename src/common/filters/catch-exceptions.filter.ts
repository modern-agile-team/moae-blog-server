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

    const checkHttpException = exception => exception instanceof HttpException;

    if (checkHttpException(exception)) {
      return response.status(exception.getStatus()).json(exception.getResponse());
    }
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ description: '서버 에러입니다.' });
  }
}
