import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UpdateAlbum } from '../album.interface';

export class UpdateAlbumDto implements UpdateAlbum {
  @IsNotEmpty()
  @IsString()
  name: string;

  artistId: string | null;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}
