import { Exclude } from 'class-transformer';

export class CreateActivityDto {
  @Exclude()
  action?: 'create' | 'read' | 'update' | 'delete';

  @Exclude()
  collection?: string;

  @Exclude()
  ip?: string;

  @Exclude()
  item?: string;

  @Exclude()
  user?: string;
}
