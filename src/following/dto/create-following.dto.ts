import { IsLatitude, IsLongitude, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateFollowingDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumberString()
  @IsLongitude()
  longitude?: string;

  @IsOptional()
  @IsNumberString()
  @IsLatitude()
  latitude?: string;

  contact: Contact
  user: User
}
