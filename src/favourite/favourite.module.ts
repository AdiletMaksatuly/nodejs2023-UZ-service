import { Module } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { FavouriteController } from './favourite.controller';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [TrackModule],
  providers: [FavouriteService],
  controllers: [FavouriteController],
})
export class FavouriteModule {}
