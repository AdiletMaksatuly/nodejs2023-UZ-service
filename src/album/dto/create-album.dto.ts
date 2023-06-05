import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateAlbum } from '../album.interface';

export class CreateAlbumDto implements CreateAlbum {
  @IsNotEmpty()
  @IsString()
  name: string;

  artistId: string | null;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}
