import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateArtist } from '../artist.interface';

export class CreateArtistDto implements CreateArtist {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
