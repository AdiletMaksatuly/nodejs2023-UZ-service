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
import { assertValidUuid } from '../util/assert-valid-uuid.util';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './track.entity';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  public async getTracks(): Promise<TrackEntity[]> {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  public async getTrack(@Param('id') trackId: string): Promise<TrackEntity> {
    assertValidUuid(trackId);

    const track = await this.trackService.getTrack(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Post()
  public async createTrack(
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return await this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  public async updateTrack(
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity> {
    assertValidUuid(trackId);

    const track = await this.trackService.getTrack(trackId);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return await this.trackService.updateTrack(trackId, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteTrack(@Param('id') trackId: string): Promise<void> {
    assertValidUuid(trackId);

    const { affected } = await this.trackService.deleteTrack(trackId);

    if (!affected) {
      throw new NotFoundException("Track doesn't exist");
    }
  }
}
