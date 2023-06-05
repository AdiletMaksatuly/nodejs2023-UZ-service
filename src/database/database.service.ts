import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { Track } from 'src/track/track.interface';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';

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

  createTrack(createTrackDto: CreateTrackDto): Track {
    const createdTrack: Track = {
      ...createTrackDto,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
      id: v4(),
    };

    this.tracks = [...this.tracks, createdTrack];

    return createdTrack;
  }

  updateTrack(trackId: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findTrack(trackId);

    if (!track) return null;

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.tracks = this.tracks.map((track) => {
      if (track.id === trackId) return updatedTrack;

      return track;
    });

    return updatedTrack;
  }
}
