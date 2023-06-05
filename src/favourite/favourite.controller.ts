import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouritesResponse } from './favourite.interface';
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Controller('favs')
export class FavouriteController {
  constructor(
    private favouriteService: FavouriteService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  @Get()
  getFavs(): FavouritesResponse {
    return this.favouriteService.getAllFavs();
  }

  @Post('/track/:id')
  addTrackToFavs(@Param('id') trackId: string): void {
    assertValidUuid(trackId);

    const track = this.trackService.getTrack(trackId);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    this.favouriteService.addTrackToFavs(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrackFromFavs(@Param('id') trackId: string): void {
    assertValidUuid(trackId);

    const allFavs = this.favouriteService.getAllFavs();
    const trackToBeDeleted = allFavs.tracks.find(
      (track) => track.id === trackId,
    );

    if (!trackToBeDeleted) {
      throw new NotFoundException('Track not found');
    }

    this.favouriteService.removeTrackFromFavs(trackId);
  }

  @Post('/album/:id')
  addAlbumToFavs(@Param('id') albumId: string): void {
    assertValidUuid(albumId);

    const album = this.albumService.getAlbum(albumId);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    this.favouriteService.addAlbumToFavs(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbumFromFavs(@Param('id') albumId: string): void {
    assertValidUuid(albumId);

    const allFavs = this.favouriteService.getAllFavs();
    const albumToBeDeleted = allFavs.albums.find(
      (album) => album.id === albumId,
    );

    if (!albumToBeDeleted) {
      throw new NotFoundException('Album not found');
    }

    this.favouriteService.removeAlbumFromFavs(albumId);
  }

  @Post('/artist/:id')
  addArtistumToFavs(@Param('id') artistId: string): void {
    assertValidUuid(artistId);

    const artist = this.artistService.getArtist(artistId);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    this.favouriteService.addArtistToFavs(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtistFromFavs(@Param('id') artistId: string): void {
    assertValidUuid(artistId);

    const allFavs = this.favouriteService.getAllFavs();
    const artistToBeDeleted = allFavs.artists.find(
      (artist) => artist.id === artistId,
    );

    if (!artistToBeDeleted) {
      throw new NotFoundException('Artist not found');
    }

    this.favouriteService.removeArtistFromFavs(artistId);
  }
}
