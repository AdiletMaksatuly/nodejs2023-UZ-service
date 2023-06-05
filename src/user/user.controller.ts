import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserWithoutPassword } from './user.interface';
import { validate } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getAllUsers(): UserWithoutPassword[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  public getUser(@Param('id') userId: string): UserWithoutPassword {
    const isValid = validate(userId);

    if (!isValid) throw new BadRequestException('Invalid user ID');

    const user = this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): UserWithoutPassword {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  public updateUser(
    @Param('id') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserWithoutPassword {
    const isValid = validate(userId);

    if (!isValid) throw new BadRequestException('Invalid user ID');

    const user = this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userService.updateUser(userId, updatePasswordDto);
  }
}
