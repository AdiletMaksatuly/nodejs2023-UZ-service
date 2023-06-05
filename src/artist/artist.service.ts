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

    tracks.forEach((track) => {
      if (track.artistId === artistId) {
        this.databaseService.updateTrack(track.id, {
          ...track,
          artistId: null,
        });
      }
    });

    this.databaseService.deleteArtist(artistId);
  }
}
