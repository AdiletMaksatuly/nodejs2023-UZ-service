import { UpdatePassword } from '../user.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto implements UpdatePassword {
  @IsNotEmpty()
  @IsString()
  oldPassword;

  @IsNotEmpty()
  @IsString()
  newPassword;
}
