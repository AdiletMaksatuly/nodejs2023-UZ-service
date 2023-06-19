import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavouriteModule } from './favourite/favourite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/orm.config';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavouriteModule,
    TypeOrmModule.forRoot(ormConfig.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
