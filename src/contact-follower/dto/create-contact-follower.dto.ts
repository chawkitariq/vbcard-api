import { Exclude } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Contact } from 'src/contact/entities/contact.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateContactFollowerDto {
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

  @Exclude()
  contact: Contact;

  @Exclude()
  follower: User;
}
