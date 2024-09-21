import { Exclude } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateOrganizationDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Exclude()
  owner: User;
}
