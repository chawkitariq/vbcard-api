import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { Organization } from 'src/organization/entities/organization.entity';

export class CreateOrganizationInvitationDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsIn(['member', 'manager', 'admin'])
  role?: 'member' | 'manager' | 'admin';

  @Exclude()
  organization: Organization;
}
