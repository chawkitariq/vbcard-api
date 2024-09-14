import { IsDefined, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsExist } from 'src/constraint/is-exist.constraint';
import { User } from 'src/user/entities/user.entity';

export class CreateNotificationDto {
  @IsDefined()
  @IsUUID('4')
  @IsExist(User, (id: string) => ({ where: { id } }))
  recipientId?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  message: string;

  recipient: User;
}
