import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.interface';

@Injectable()
export class DatabaseService {
  private users: User[] = [];

  findAllUsers(): User[] {
    return this.users;
  }
}
