import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User, UserWithoutPassword } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { removeProperty } from '../util/remove-property.util';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validate } from 'uuid';

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

  updateUser(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserWithoutPassword {
    const user = this.databaseService.findUser(userId);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Invalid old password');
    }

    return this.removePasswordFromUser(
      this.databaseService.updateUser(userId, updatePasswordDto),
    );
  }

  deleteUser(userId: string): void {
    this.databaseService.deleteUser(userId);
  }

  private removePasswordFromUser(user: User): UserWithoutPassword {
    return removeProperty(user, 'password');
  }

  public assertValidId(userId: string): void {
    const isValid = validate(userId);

    if (!isValid) throw new BadRequestException('Invalid user ID');
  }
}
