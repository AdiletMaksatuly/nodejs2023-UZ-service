import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Album } from '../album/album.interface';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) {}

  getAlbums(): Album[] {
    return this.databaseService.findAllAlbums();
  }

  getAlbum(albumId: string): Album {
    return this.databaseService.findAlbum(albumId);
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    return this.databaseService.createAlbum(createAlbumDto);
  }

  updateAlbum(albumId: string, updateAlbumDto: UpdateAlbumDto): Album {
    return this.databaseService.updateAlbum(albumId, updateAlbumDto);
  }

  deleteAlbum(albumId: string): void {
    const tracks = this.databaseService.findAllTracks();

    tracks.forEach((track) => {
      if (track.albumId === albumId) {
        this.databaseService.updateTrack(track.id, {
          ...track,
          albumId: null,
        });
      }
    });

    this.databaseService.deleteAlbum(albumId);
  }
}
