import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs';
import { ContactStatisticTrackingService } from '../contact-statistic-tracking.service';
import { User } from 'src/user/entities/user.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { ContactStatisticTracking } from '../entities/contact-statistic-tracking.entity';

@Injectable()
export class ContactStatisticTrackingInterceptor implements NestInterceptor {
  constructor(private readonly contactStatisticTrackingService: ContactStatisticTrackingService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const { ip, path, ...request } = context.switchToHttp().getRequest<Request>();

    const field = path.split('/').at(-1) as ContactStatisticTracking.Field;
    const user = request.user as User;

    return next.handle().pipe(
      tap((contact: Contact) => {
        this.contactStatisticTrackingService.create({
          ip,
          field,
          contact,
          user
        });
        return contact;
      })
    );
  }
}
