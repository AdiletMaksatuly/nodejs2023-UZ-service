import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Track } from './track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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

  updateTrack(trackId: string, updateTrackDto: UpdateTrackDto): Track {
    return this.databaseService.updateTrack(trackId, updateTrackDto);
  }

  deleteTrack(trackId: string): void {
    this.databaseService.removeTrackFromFavs(trackId);
    this.databaseService.deleteTrack(trackId);
  }
}
