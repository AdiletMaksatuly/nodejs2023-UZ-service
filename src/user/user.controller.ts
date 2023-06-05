import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserWithoutPassword } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { assertValidUuid } from '../util/assert-valid-uuid.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getAllUsers(): UserWithoutPassword[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  public getUser(@Param('id') userId: string): UserWithoutPassword {
    assertValidUuid(userId);

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
    assertValidUuid(userId);

    const user = this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userService.updateUser(userId, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public deleteUser(@Param('id') userId: string): void {
    assertValidUuid(userId);

    const user = this.userService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userService.deleteUser(userId);
  }
}
