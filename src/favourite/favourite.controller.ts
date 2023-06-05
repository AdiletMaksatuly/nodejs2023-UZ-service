import { Controller, Get } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouritesResponse } from './favourite.interface';

@Controller('favs')
export class FavouriteController {
  constructor(private favouriteService: FavouriteService) {}

  @Get()
  getFavs(): FavouritesResponse {
    return this.favouriteService.getAllFavs();
  }
}
