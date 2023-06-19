import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { AlbumEntity } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    private databaseService: DatabaseService,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
  ) {}

  public async getAlbums(): Promise<AlbumEntity[]> {
    return await this.albumsRepository.find();
  }

  public async getAlbum(albumId: string): Promise<AlbumEntity> {
    return await this.albumsRepository.findOneBy({
      id: albumId,
    });
  }

  public async createAlbum(
    createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumEntity> {
    const createdAlbum = this.albumsRepository.create(createAlbumDto);

    return await this.albumsRepository.save(createdAlbum);
  }

  public async updateAlbum(
    albumId: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    const album = await this.getAlbum(albumId);

    return await this.albumsRepository.save({
      ...album,
      ...updateAlbumDto,
    });
  }

  public async deleteAlbum(albumId: string): Promise<void> {
    const tracks = this.databaseService.findAllTracks();

    tracks.forEach((track) => {
      if (track.albumId === albumId) {
        this.databaseService.updateTrack(track.id, {
          ...track,
          albumId: null,
        });
      }
    });

    this.databaseService.removeAlbumFromFavs(albumId);

    this.databaseService.deleteAlbum(albumId);
  }
}
