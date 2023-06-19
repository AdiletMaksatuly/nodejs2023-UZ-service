import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { Album } from './album.interface';

@Entity('album')
export class AlbumEntity implements Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'year', type: 'int' })
  year: number;

  @Column({ name: 'artist_id', type: 'uuid', default: null })
  artistId: string | null;

  // TODO After implementing Delete Artist logic, check if artistId is null after deleting artist
  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
