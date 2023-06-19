import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';

@Entity('favourite_artist')
export class FavouriteArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'artist_id', type: 'uuid' })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artist_id', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
