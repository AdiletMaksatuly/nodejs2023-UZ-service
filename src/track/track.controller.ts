import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';
import { assertValidUuid } from '../util/assert-valid-uuid.util';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks(): Track[] {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id') trackId: string): Track {
    assertValidUuid(trackId);

    const track = this.trackService.getTrack(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }
}
