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
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { AlbumEntity } from './album.entity';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  public async getAlbums(): Promise<AlbumEntity[]> {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  public async getAlbum(@Param('id') albumId: string): Promise<AlbumEntity> {
    assertValidUuid(albumId);

    const album = this.albumService.getAlbum(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  public async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumEntity> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  public async updateAlbum(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity> {
    assertValidUuid(albumId);

    const album = this.albumService.getAlbum(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.albumService.updateAlbum(albumId, updateAlbumDto);
  }

  // TODO: Make work with TypeORM after implementing repository for Favs
  @Delete(':id')
  @HttpCode(204)
  public async deleteAlbum(@Param('id') albumId: string): Promise<void> {
    assertValidUuid(albumId);

    const album = this.albumService.getAlbum(albumId);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.albumService.deleteAlbum(albumId);
  }
}
