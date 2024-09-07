import { IsDefined, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { User } from 'src/user/entities/user.entity';

export class UserIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsExist(User, { message: 'User id not found' })
  userId: string;
}
