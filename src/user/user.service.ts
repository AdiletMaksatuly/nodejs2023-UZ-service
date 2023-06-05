import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User, UserWithoutPassword } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { removeProperty } from '../util/remove-property.util';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  getUsers(): UserWithoutPassword[] {
    const users = this.databaseService.findAllUsers();

    return users.map((user) => this.removePasswordFromUser(user));
  }

  getUser(userId: string): UserWithoutPassword | null {
    const user = this.databaseService.findUser(userId);

    if (!user) return null;

    return this.removePasswordFromUser(user);
  }

  createUser(createUserDto: CreateUserDto): UserWithoutPassword {
    return this.removePasswordFromUser(
      this.databaseService.createUser(createUserDto),
    );
  }

  private removePasswordFromUser(user: User): UserWithoutPassword {
    return removeProperty(user, 'password');
  }
}
