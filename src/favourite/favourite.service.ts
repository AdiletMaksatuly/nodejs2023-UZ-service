import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { FavouritesResponse } from './favourite.interface';

@Injectable()
export class FavouriteService {
  constructor(private databaseService: DatabaseService) {}

  getAllFavs(): FavouritesResponse {
    return this.databaseService.findAllFavs();
  }
}
