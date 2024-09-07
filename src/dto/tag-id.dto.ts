import { IsDefined, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { Tag } from 'src/tag/entities/tag.entity';

export class TagIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsExist(Tag, { message: 'Tag id not found' })
  tagId: string;
}
