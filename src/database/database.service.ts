import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { Track } from 'src/track/track.interface';

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private tracks: Track[] = [];

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

  updateUser(userId: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findUser(userId);

    if (!user) return null;

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((user) => {
      if (user.id === userId) return updatedUser;

      return user;
    });

    return updatedUser;
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  findAllTracks(): Track[] {
    return this.tracks;
  }

  findTrack(trackId: string): Track | null {
    return this.tracks.find((track) => track.id === trackId);
  }
}
