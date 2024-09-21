import { IsDefined, IsUUID } from 'class-validator';

export class IdDto {
  @IsDefined()
  @IsUUID('4')
  id: string;
}
