import { IsDefined, IsUUID } from 'class-validator';
import { IsOneExist } from 'src/constraint/is-one-exist.constraint';
import { User } from 'src/user/entities/user.entity';

export class UserIdDto {
  @IsDefined()
  @IsUUID('4')
  @IsOneExist(User, (id: string) => ({ where: { id } }), { message: 'User does not exist' })
  userId: string;
}
