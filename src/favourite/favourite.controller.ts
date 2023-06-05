import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouritesResponse } from './favourite.interface';
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { TrackService } from '../track/track.service';

@Controller('favs')
export class FavouriteController {
  constructor(
    private favouriteService: FavouriteService,
    private trackService: TrackService,
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
}
