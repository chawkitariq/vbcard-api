import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { File } from '../entities/file.entity';

@Injectable()
export class FileUrlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const baseUrl = `${request.protocol}://${request.get('host')}`;

    return next.handle().pipe(
      map((data: File) => {
        return data;
      })
    );
  }
}
