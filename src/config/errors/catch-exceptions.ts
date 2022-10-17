import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export default class CatchException implements ExceptionFilter {
  catch(exception: any | HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let context = null;

    context = `${response.req.method} - ${response.req.route?.path}` || null;

    if (context === null) {
      if (request.route) {
        context = `${Object.keys(request.route?.method)[0]} - ${
          request.route?.path
        }`;
      }
    }

    return response.status(500).json({
      status: 500,
      description: 'server error please contect to backend',
      context: context,
    });
  }
}
