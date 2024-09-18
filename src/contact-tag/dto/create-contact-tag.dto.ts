import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactTagDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}
