import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Track } from './track.interface';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  getTracks(): Track[] {
    return this.databaseService.findAllTracks();
  }

  getTrack(trackId: string): Track {
    return this.databaseService.findTrack(trackId);
  }
}
