import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IsOneExist } from 'src/constraint/is-one-exist.constraint';
import { IsVcard } from 'src/constraint/is-vcard.constraint';
import { File } from 'src/file/entities/file.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateContactDto {
  @IsOptional()
  @IsString()
  @IsVcard()
  vcard?: string;

  @IsOptional()
  @IsString()
  @IsUUID('4')
  @IsOneExist(File, (id: string) => ({ where: { id } }))
  photoId?: string;

  photo?: File;
  author?: User;
}
