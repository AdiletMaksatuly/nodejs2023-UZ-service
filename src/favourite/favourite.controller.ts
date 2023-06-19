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
  public async getFavs(): Promise<FavouritesResponse> {
    return this.favouriteService.getAllFavs();
  }

  @Post('/track/:id')
  public async addTrackToFavs(@Param('id') trackId: string): Promise<void> {
    assertValidUuid(trackId);

    const track = await this.trackService.getTrack(trackId);

    if (!track) {
      throw new UnprocessableEntityException("Track doesn't exist");
    }

    await this.favouriteService.addTrackToFavs(trackId);
  }

  @Delete('/track/:id')
  @HttpCode(204)
  public async removeTrackFromFavs(
    @Param('id') trackId: string,
  ): Promise<void> {
    assertValidUuid(trackId);

    const { affected } = await this.favouriteService.removeTrackFromFavs(
      trackId,
    );

    if (!affected) {
      throw new NotFoundException("Track doesn't exist");
    }
  }

  @Post('/album/:id')
  public async addAlbumToFavs(@Param('id') albumId: string): Promise<void> {
    assertValidUuid(albumId);

    const album = await this.albumService.getAlbum(albumId);

    if (!album) {
      throw new UnprocessableEntityException("Album doesn't exist");
    }

    await this.favouriteService.addAlbumToFavs(albumId);
  }

  @Delete('/album/:id')
  @HttpCode(204)
  public async removeAlbumFromFavs(
    @Param('id') albumId: string,
  ): Promise<void> {
    assertValidUuid(albumId);

    const { affected } = await this.favouriteService.removeAlbumFromFavs(
      albumId,
    );

    if (!affected) {
      throw new NotFoundException("Album doesn't exist");
    }
  }

  @Post('/artist/:id')
  public async addArtistToFavs(@Param('id') artistId: string): Promise<void> {
    assertValidUuid(artistId);

    const artist = await this.artistService.getArtist(artistId);

    if (!artist) {
      throw new UnprocessableEntityException("Artist doesn't exist");
    }

    await this.favouriteService.addArtistToFavs(artistId);
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  public async removeArtistFromFavs(
    @Param('id') artistId: string,
  ): Promise<void> {
    assertValidUuid(artistId);

    const { affected } = await this.favouriteService.removeArtistFromFavs(
      artistId,
    );

    if (!affected) {
      throw new NotFoundException("Artist doesn't exist");
    }
  }
}
