import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';

export class UserMeFollowingDto {
  @IsDefined()
  @IsNotEmpty()
  @IsUUID('4')
  @IsExist(Contact)
  contactId: string;

  contact: Contact;
  user: User;
}
