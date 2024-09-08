import { IsDefined, IsUUID } from 'class-validator';
import { IsOneExist } from 'src/constraint/is-one-exist.constraint';
import { Contact } from 'src/contact/entities/contact.entity';

export class ContactIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsOneExist(Contact, (id: string) => ({ where: { id } }), { message: 'Contact does not exist' })
  contactId: string;
}
