import { CreateUser } from '../user.interface';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto implements CreateUser {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
