import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    private databaseService: DatabaseService,
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}

  public async getArtists(): Promise<ArtistEntity[]> {
    return await this.artistsRepository.find();
  }

  public async getArtist(artistId: string): Promise<ArtistEntity> {
    return await this.artistsRepository.findOneBy({
      id: artistId,
    });
  }

  public async createArtist(
    createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    const createdArtist = this.artistsRepository.create(createArtistDto);

    return await this.artistsRepository.save(createdArtist);
  }

  public async updateArtist(
    artistId: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const artist = await this.getArtist(artistId);

    return await this.artistsRepository.save({
      ...artist,
      ...updateArtistDto,
    });
  }

  public async deleteArtist(artistId: string): Promise<DeleteResult> {
    return await this.artistsRepository.delete(artistId);
  }
}
