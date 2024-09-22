import { Exclude } from 'class-transformer';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Organization } from 'src/organization/entities/organization.entity';

export class CreateOrganizationInvitationDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  organization: Organization;
}
