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

  public async getUser(
    userId: string,
    withPassword = false,
  ): Promise<UserEntity | null> {
    const userPropsWithoutPassword: Array<keyof UserEntity> = [
      'id',
      'login',
      'version',
      'createdAt',
      'updatedAt',
    ];

    return await this.usersRepository.findOne({
      where: { id: userId },
      select: withPassword
        ? [...userPropsWithoutPassword, 'password']
        : userPropsWithoutPassword,
    });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = this.usersRepository.create(createUserDto);

    const savedUser = await this.usersRepository.save(createdUser);

    return await this.getUser(savedUser.id);
  }

  public async updateUser(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.getUser(userId);

    const savedUser = await this.usersRepository.save({
      ...user,
      password: updatePasswordDto.newPassword,
    });

    return await this.getUser(savedUser.id);
  }

  public async deleteUser(userId: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(userId);
  }
}
