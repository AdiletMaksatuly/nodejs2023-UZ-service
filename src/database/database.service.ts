import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { v4 } from 'uuid';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';
import { Track } from 'src/track/track.interface';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { Artist } from '../artist/artist.interface';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
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

  findAllUsers(): User[] {
    return this.users;
  }

  findUser(userId: string): User | null {
    return this.users.find((user) => user.id === userId);
  }

  createUser(createUserDto: CreateUserDto): User {
    const createdUser: User = {
      ...createUserDto,
      id: v4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users = [...this.users, createdUser];

    return createdUser;
  }

  updateUser(userId: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findUser(userId);

    if (!user) return null;

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((user) => {
      if (user.id === userId) return updatedUser;

      return user;
    });

    return updatedUser;
  }

  deleteUser(userId: string): void {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  findAllTracks(): Track[] {
    return this.tracks;
  }

  findTrack(trackId: string): Track | null {
    return this.tracks.find((track) => track.id === trackId);
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const createdTrack: Track = {
      ...createTrackDto,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
      id: v4(),
    };

    this.tracks = [...this.tracks, createdTrack];

    return createdTrack;
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

  findAllArtists(): Artist[] {
    return this.artists;
  }

  findArtist(artistId: string): Artist | null {
    return this.artists.find((artist) => artist.id === artistId);
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const createdArtist: Artist = {
      ...createArtistDto,
      id: v4(),
    };

    this.artists = [...this.artists, createdArtist];

    return createdArtist;
  }

  updateArtist(artistId: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findArtist(artistId);

    if (!artist) return null;

    const updatedArtist: Artist = {
      ...artist,
      ...updateArtistDto,
    };

    this.artists = this.artists.map((artist) => {
      if (artist.id === artistId) return updatedArtist;

      return artist;
    });

    return updatedArtist;
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

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const createdAlbum: Album = {
      ...createAlbumDto,
      id: v4(),
      artistId: createAlbumDto.artistId ?? null,
    };

    this.albums = [...this.albums, createdAlbum];

    return createdAlbum;
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

  findAllFavs(): FavouritesResponse {
    return this.favourites;
  }

  addTrackToFavs(trackId: string): void {
    const trackToBeAdded = this.findTrack(trackId);

    this.favourites = {
      ...this.favourites,
      tracks: [...this.favourites.tracks, trackToBeAdded],
    };
  }

  removeTrackFromFavs(trackId: string): void {
    this.favourites = {
      ...this.favourites,
      tracks: this.favourites.tracks.filter((track) => track.id !== trackId),
    };
  }
}
