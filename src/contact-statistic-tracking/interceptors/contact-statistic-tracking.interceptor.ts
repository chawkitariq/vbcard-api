import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor
} from '@nestjs/common';
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
    const { ip, path, params, query, body, ...request } = context.switchToHttp().getRequest<Request>();

    const user = request.user as User;
    const { contactId } = { ...params, ...query, ...body } as { contactId: string };

    let contactStatisticTracking: ContactStatisticTracking | null;

    try {
      contactStatisticTracking = await this.contactStatisticTrackingService.findOneByUserAndContact(user.id, contactId);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (contactStatisticTracking) {
      throw new ForbiddenException('Action already performed');
    }

    const field = path.split('/').at(-1) as ContactStatisticTracking.Field;

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
