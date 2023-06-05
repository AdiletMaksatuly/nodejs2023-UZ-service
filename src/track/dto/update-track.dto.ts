import { UpdateTrack } from '../track.interface';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto implements UpdateTrack {
  @IsNotEmpty()
  @IsString()
  name: string;

  artistId: string | null;

  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
