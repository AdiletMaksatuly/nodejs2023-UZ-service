import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteAlbumEntity } from './favourite-album.entity';
import { FavouriteArtistEntity } from './favourite-artist.entity';
import { FavouriteTrackEntity } from './favourite-track.entity';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    ArtistModule,
    TypeOrmModule.forFeature([
      FavouriteAlbumEntity,
      FavouriteArtistEntity,
      FavouriteTrackEntity,
    ]),
  ],
  providers: [FavouriteService],
  controllers: [FavouriteController],
})
export class FavouriteModule {}
