import { Controller, Get } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }
}
