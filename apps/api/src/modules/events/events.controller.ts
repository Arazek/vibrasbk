import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { EventsService } from './events.service';
import { VotesService } from '../votes/votes.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

// Path mirrors future MinIO object key: events/photos/{uuid}.{ext}
const photoStorage = diskStorage({
  destination: join(process.cwd(), 'apps', 'api', 'uploads', 'events', 'photos'),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
  },
});

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private votesService: VotesService
  ) {}

  @Get('week')
  @ApiOperation({ summary: 'Weekly agenda enriched with vote counts and vibe color' })
  getWeeklyEvents(@Request() req: any, @Query('type') type?: string) {
    return this.eventsService.getWeeklyEvents(req.user.id, type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single event enriched with vote data for the current week' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.getEventDetail(id, req.user.id);
  }

  @Get(':id/analytics')
  @ApiOperation({ summary: 'Full prediction analytics (requires going or maybe vote)' })
  getAnalytics(@Param('id') id: string, @Request() req: any) {
    return this.votesService.getAnalytics(id, req.user.id);
  }

  // ─── Admin endpoints ──────────────────────────────────────────────────────

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '[Admin] Create a recurring event' })
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventsService.createEvent(dto);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '[Admin] Update a recurring event' })
  updateEvent(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.updateEvent(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '[Admin] Soft-delete (deactivate) an event' })
  removeEvent(@Param('id') id: string) {
    return this.eventsService.removeEvent(id);
  }

  @Post(':id/photo')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '[Admin] Upload event photo' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { storage: photoStorage }))
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const photoUrl = `/uploads/events/photos/${file.filename}`;
    return this.eventsService.updatePhoto(id, photoUrl);
  }
}
