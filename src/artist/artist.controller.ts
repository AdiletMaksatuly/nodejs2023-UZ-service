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
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  public async getArtists(): Promise<ArtistEntity[]> {
    return this.artistService.getArtists();
  }

  @Get(':id')
  public async getArtist(@Param('id') artistId: string): Promise<ArtistEntity> {
    assertValidUuid(artistId);

    const artist = await this.artistService.getArtist(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Post()
  public async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  public async updateArtist(
    @Param('id') artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    assertValidUuid(artistId);

    const artist = await this.artistService.getArtist(artistId);

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return await this.artistService.updateArtist(artistId, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteArtist(@Param('id') artistId: string): Promise<void> {
    assertValidUuid(artistId);

    const { affected } = await this.artistService.deleteArtist(artistId);

    if (!affected) {
      throw new NotFoundException("Artist doesn't exist");
    }
  }
}
