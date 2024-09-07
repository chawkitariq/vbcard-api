import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}
