import { IsDefined, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { Tag } from 'src/tag/entities/tag.entity';

export class TagIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsExist(Tag, (id: string) => ({ where: { id } }), { message: 'Tag does not exist' })
  tagId: string;
}
