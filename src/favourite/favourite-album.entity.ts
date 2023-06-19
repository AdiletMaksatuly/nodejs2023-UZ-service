import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../album/album.entity';

@Entity('favourite_album')
export class FavouriteAlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'album_id', type: 'uuid' })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'album_id', referencedColumnName: 'id' })
  album: AlbumEntity;
}
