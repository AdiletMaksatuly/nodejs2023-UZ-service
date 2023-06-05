import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.interface';
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getArtists(): Artist[] {
    return this.artistService.getArtists();
  }

  @Get(':id')
  public getArtist(@Param('id') artistId: string): Artist {
    assertValidUuid(artistId);

    const artist = this.artistService.getArtist(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Post()
  public createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  public updateArtist(
    @Param('id') artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Artist {
    assertValidUuid(artistId);

    const artist = this.artistService.getArtist(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistService.updateArtist(artistId, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public deleteArtist(@Param('id') artistId: string): void {
    assertValidUuid(artistId);

    const artist = this.artistService.getArtist(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.artistService.deleteArtist(artistId);
  }
}
