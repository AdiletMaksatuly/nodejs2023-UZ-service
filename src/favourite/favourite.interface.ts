import { TrackEntity } from '../track/track.entity';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';

export interface Favourites {
  // ids of the favourite artists, albums and tracks
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavouritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}
