import { IsDefined, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { User } from 'src/user/entities/user.entity';

export class UserIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsExist(User, (id: string) => ({ where: { id } }), { message: 'User does not exist' })
  userId: string;
}
