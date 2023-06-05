import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UpdateArtist } from '../artist.interface';

export class UpdateArtistDto implements UpdateArtist {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
