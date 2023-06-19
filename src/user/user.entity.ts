import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.interface';

@Entity({ name: 'user' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'login', type: 'varchar' })
  login: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password: string;

  @VersionColumn({ name: 'version', type: 'int' })
  version: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    transformer: {
      from(value: Date): number {
        return value.getTime();
      },
      to(value: Date) {
        return value;
      },
    },
  })
  createdAt: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    transformer: {
      from(value: Date): number {
        return value.getTime();
      },
      to(value: Date) {
        return value;
      },
    },
  })
  updatedAt: number;
}
