import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Artist } from './artist.interface';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  getArtists(): Artist[] {
    return this.databaseService.findAllArtists();
  }
}
