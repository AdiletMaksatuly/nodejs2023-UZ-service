import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.interface';
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Track {
    assertValidUuid(trackId);

    const track = this.trackService.getTrack(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return this.trackService.updateTrack(trackId, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public deleteTrack(@Param('id') trackId: string): void {
    assertValidUuid(trackId);

    const track = this.trackService.getTrack(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    this.trackService.deleteTrack(trackId);
  }
}
