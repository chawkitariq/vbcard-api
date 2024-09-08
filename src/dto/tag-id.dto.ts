import { IsDefined, IsUUID } from 'class-validator';
import { IsOneExist } from 'src/constraint/is-one-exist.constraint';
import { Tag } from 'src/tag/entities/tag.entity';

export class TagIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsOneExist(Tag, (id: string) => ({ where: { id } }), { message: 'Tag does not exist' })
  tagId: string;
}
