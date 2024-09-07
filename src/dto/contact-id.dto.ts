import { IsDefined, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { Contact } from 'src/contact/entities/contact.entity';

export class ContactIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsExist(Contact)
  contactId: string;
}
