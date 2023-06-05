import { Controller, Get } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.interface';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }
}
