import { IsOptional, IsString, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { IsVcf } from 'src/constraint/is-vcf.constraint';
import { File } from 'src/file/entities/file.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateContactDto {
  @IsOptional()
  @IsString()
  @IsVcf('4.0')
  vcf?: string;

  @IsOptional()
  @IsString()
  @IsUUID('4')
  @IsExist(File)
  photoId?: string;

  photo?: File;
  author?: User;
}
