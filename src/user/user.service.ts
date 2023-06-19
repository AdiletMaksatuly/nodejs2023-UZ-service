import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly databaseService: DatabaseService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async getUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  public async getUser(userId: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({
      id: userId,
    });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = this.usersRepository.create(createUserDto);

    return await this.usersRepository.save(createdUser);
  }

  public async updateUser(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.getUser(userId);

    return await this.usersRepository.save({
      ...user,
      password: updatePasswordDto.newPassword,
    });
  }

  public async deleteUser(userId: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(userId);
  }
}
