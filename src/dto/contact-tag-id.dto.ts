import { IsDefined, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { ContactTag } from 'src/contact-tag/entities/contact-tag.entity';

export class ContactTagIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsExist(ContactTag, (id: string) => ({ where: { id } }), { message: 'ContactTag does not exist' })
  contactTagId: string;
}
