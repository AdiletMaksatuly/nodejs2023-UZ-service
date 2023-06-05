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
import { AlbumService } from '../album/album.service';
import { Album } from '../album/album.interface';
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAlbums(): Album[] {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') albumId: string): Album {
    assertValidUuid(albumId);

    const album = this.albumService.getAlbum(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Album {
    assertValidUuid(albumId);

    const album = this.albumService.getAlbum(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumService.updateAlbum(albumId, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public deleteAlbum(@Param('id') albumId: string): void {
    assertValidUuid(albumId);

    const album = this.albumService.getAlbum(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.albumService.deleteAlbum(albumId);
  }
}
