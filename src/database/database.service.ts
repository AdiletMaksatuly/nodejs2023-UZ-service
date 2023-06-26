import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.interface';
import { Track } from 'src/track/track.interface';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { Artist } from '../artist/artist.interface';
import { Album } from '../album/album.interface';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { FavouritesResponse } from '../favourite/favourite.interface';

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];

  private favourites: FavouritesResponse = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAllTracks(): Track[] {
    return this.tracks;
  }

  findTrack(trackId: string): Track | null {
    return this.tracks.find((track) => track.id === trackId);
  }
  updateTrack(trackId: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.findTrack(trackId);

    if (!track) return null;

    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };

    this.tracks = this.tracks.map((track) => {
      if (track.id === trackId) return updatedTrack;

      return track;
    });

    return updatedTrack;
  }

  deleteTrack(trackId: string): void {
    this.tracks = this.tracks.filter((track) => track.id !== trackId);
  }

  deleteArtist(artistId: string): void {
    this.artists = this.artists.filter((artist) => artist.id !== artistId);
  }

  findAllAlbums(): Album[] {
    return this.albums;
  }

  findAlbum(albumId: string): Album | null {
    return this.albums.find((album) => album.id === albumId);
  }

  updateAlbum(albumId: string, updateAlbumDto: CreateAlbumDto): Album {
    const album = this.findAlbum(albumId);

    if (!album) return null;

    const updatedAlbum: Album = {
      ...album,
      ...updateAlbumDto,
    };

    this.albums = this.albums.map((album) => {
      if (album.id === albumId) return updatedAlbum;

      return album;
    });

    return updatedAlbum;
  }

  deleteAlbum(albumId: string): void {
    this.albums = this.albums.filter((album) => album.id !== albumId);
  }

  removeTrackFromFavs(trackId: string): void {
    this.favourites = {
      ...this.favourites,
      tracks: this.favourites.tracks.filter((track) => track.id !== trackId),
    };
  }

  removeAlbumFromFavs(albumId: string): void {
    this.favourites = {
      ...this.favourites,
      albums: this.favourites.albums.filter((album) => album.id !== albumId),
    };
  }

  removeArtistFromFavs(artistId: string): void {
    this.favourites = {
      ...this.favourites,
      artists: this.favourites.artists.filter(
        (artist) => artist.id !== artistId,
      ),
    };
  }
}
