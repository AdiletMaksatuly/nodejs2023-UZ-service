import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from '../track/track.entity';

@Entity('favourite_track')
export class FavouriteTrackEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'track_id', type: 'uuid' })
  trackId: string | null;

  @ManyToOne(() => TrackEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'track_id', referencedColumnName: 'id' })
  track: TrackEntity;
}
