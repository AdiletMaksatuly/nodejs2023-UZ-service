import { CreateUser } from '../user.interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUser {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
