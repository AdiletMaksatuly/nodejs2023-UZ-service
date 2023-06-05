import { CreateTrack } from '../track.interface';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTrackDto implements CreateTrack {
  @IsNotEmpty()
  @IsString()
  name: string;

  artistId: string | null;

  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
