import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './track.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackService {
  constructor(
    private databaseService: DatabaseService,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  public async getTracks(): Promise<TrackEntity[]> {
    return await this.trackRepository.find();
  }

  public async getTrack(trackId: string): Promise<TrackEntity> {
    return await this.trackRepository.findOneBy({
      id: trackId,
    });
  }

  public async createTrack(
    createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    const createdTrack = this.trackRepository.create(createTrackDto);

    return await this.trackRepository.save(createdTrack);
  }

  public async updateTrack(
    trackId: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    const track = await this.getTrack(trackId);

    return await this.trackRepository.save({
      ...track,
      ...updateTrackDto,
    });
  }

  public async deleteTrack(trackId: string): Promise<DeleteResult> {
    return await this.trackRepository.delete(trackId);
  }
}
