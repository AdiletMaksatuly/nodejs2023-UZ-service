import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Track } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  getTracks(): Track[] {
    return this.databaseService.findAllTracks();
  }

  getTrack(trackId: string): Track {
    return this.databaseService.findTrack(trackId);
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    return this.databaseService.createTrack(createTrackDto);
  }
}
