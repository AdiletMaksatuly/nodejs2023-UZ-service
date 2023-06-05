import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { v4 } from 'uuid';

@Injectable()
export class DatabaseService {
  private users: User[] = [];

  findAllUsers(): User[] {
    return this.users;
  }

  findUser(userId: string): User | null {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const createdUser: User = {
      ...createUserDto,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users = [...this.users, createdUser];

    return createdUser;
  }
}
