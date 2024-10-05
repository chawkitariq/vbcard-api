import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class UnauthorizedExceptionFilter
  implements ExceptionFilter<HttpException>
{
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    if (status === HttpStatus.UNAUTHORIZED) {
      response.setHeader(
        'WWW-Authenticate',
        'Bearer realm="Access to Api", charset="UTF-8"'
      );
    }

    response.status(status).json(exception.getResponse());
  }
}
