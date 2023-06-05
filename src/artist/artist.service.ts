import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Artist } from './artist.interface';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  getArtists(): Artist[] {
    return this.databaseService.findAllArtists();
  }

  getArtist(artistId: string): Artist {
    return this.databaseService.findArtist(artistId);
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    return this.databaseService.createArtist(createArtistDto);
  }

  updateArtist(artistId: string, updateArtistDto: UpdateArtistDto): Artist {
    return this.databaseService.updateArtist(artistId, updateArtistDto);
  }

  deleteArtist(artistId: string): void {
    const tracks = this.databaseService.findAllTracks();
    const albums = this.databaseService.findAllAlbums();

    tracks.forEach((track) => {
      if (track.artistId === artistId) {
        this.databaseService.updateTrack(track.id, {
          ...track,
          artistId: null,
        });
      }
    });

    albums.forEach((album) => {
      if (album.artistId === artistId) {
        this.databaseService.updateAlbum(album.id, {
          ...album,
          artistId: null,
        });
      }
    });

    this.databaseService.removeArtistFromFavs(artistId);
    this.databaseService.deleteArtist(artistId);
  }
}
