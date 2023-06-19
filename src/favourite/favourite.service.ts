import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FavouritesResponse } from './favourite.interface';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouriteTrackEntity } from './favourite-track.entity';
import { FavouriteAlbumEntity } from './favourite-album.entity';
import { FavouriteArtistEntity } from './favourite-artist.entity';

@Injectable()
export class FavouriteService {
  constructor(
    private databaseService: DatabaseService,
    @InjectRepository(FavouriteAlbumEntity)
    private readonly favAlbumsRepository: Repository<FavouriteAlbumEntity>,
    @InjectRepository(FavouriteArtistEntity)
    private readonly favArtistsRepository: Repository<FavouriteArtistEntity>,
    @InjectRepository(FavouriteTrackEntity)
    private readonly favTracksRepository: Repository<FavouriteTrackEntity>,
  ) {}

  public async getAllFavs(): Promise<FavouritesResponse> {
    const favAlbums = await this.favAlbumsRepository.find({
      relations: ['album'],
    });
    const favArtists = await this.favArtistsRepository.find({
      relations: ['artist'],
    });
    const favTracks = await this.favTracksRepository.find({
      relations: ['track'],
    });

    return {
      albums: favAlbums.map((fav) => fav.album),
      artists: favArtists.map((fav) => fav.artist),
      tracks: favTracks.map((fav) => fav.track),
    };
  }

  public async addTrackToFavs(trackId: string): Promise<void> {
    const track = this.favTracksRepository.create({ trackId });

    await this.favTracksRepository.save(track);
  }

  public async removeTrackFromFavs(trackId: string): Promise<DeleteResult> {
    return await this.favTracksRepository.delete({ trackId });
  }

  public async addAlbumToFavs(albumId: string): Promise<void> {
    const album = this.favAlbumsRepository.create({ albumId });

    await this.favAlbumsRepository.save(album);
  }

  public async removeAlbumFromFavs(albumId: string): Promise<DeleteResult> {
    return await this.favAlbumsRepository.delete({ albumId });
  }

  public async addArtistToFavs(artistId: string): Promise<void> {
    const artist = this.favArtistsRepository.create({ artistId });

    await this.favArtistsRepository.save(artist);
  }

  public async removeArtistFromFavs(artistId: string): Promise<DeleteResult> {
    return await this.favArtistsRepository.delete({ artistId });
  }
}
