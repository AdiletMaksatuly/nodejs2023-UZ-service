import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getUsers(): User[] {
    return this.databaseService.findAllUsers();
  }

  getUser(userId: string): User | null {
    return this.databaseService.findUser(userId);
  }
}
