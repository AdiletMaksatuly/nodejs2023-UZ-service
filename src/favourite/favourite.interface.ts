import { Artist } from '../artist/artist.interface';
import { Album } from '../album/album.interface';
import { Track } from '../track/track.interface';

export interface FavouritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
