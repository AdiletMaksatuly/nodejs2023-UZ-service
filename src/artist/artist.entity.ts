import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist.interface';

@Entity('artist')
export class ArtistEntity implements Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'grammy', type: 'boolean' })
  grammy: boolean;

  @Column({ name: 'name', type: 'varchar' })
  name: string;
}
