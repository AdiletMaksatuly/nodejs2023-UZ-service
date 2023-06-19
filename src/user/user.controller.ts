import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  public async getUser(@Param('id') userId: string): Promise<UserEntity> {
    assertValidUuid(userId);

    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  public async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    assertValidUuid(userId);

    const user = await this.userService.getUser(userId, true);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Invalid old password');
    }

    return await this.userService.updateUser(userId, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteUser(@Param('id') userId: string): Promise<void> {
    assertValidUuid(userId);

    const { affected } = await this.userService.deleteUser(userId);

    if (affected === 0) {
      throw new NotFoundException("User doesn't exist");
    }
  }
}
