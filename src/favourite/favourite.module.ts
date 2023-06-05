import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [TrackModule, AlbumModule, ArtistModule],
  providers: [FavouriteService],
  controllers: [FavouriteController],
})
export class FavouriteModule {}
