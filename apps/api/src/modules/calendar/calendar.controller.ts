import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CalendarService } from './calendar.service';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

@ApiTags('Calendar')
@Controller('api/calendar')
@ApiBearerAuth()
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  @UseGuards(JwtAuthGuard)
  @Post('events')
  @ApiOperation({ summary: 'Create calendar event' })
  async createEvent(@Request() req: any, @Body() createEventDto: CreateEventDto) {
    return this.calendarService.createEvent(req.user.id, createEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('events')
  @ApiOperation({ summary: 'Get user events' })
  async getEvents(
    @Request() req: any,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return this.calendarService.getEvents(req.user.id, start, end);
  }

  @UseGuards(JwtAuthGuard)
  @Get('events/:eventId')
  @ApiOperation({ summary: 'Get event details' })
  async getEvent(@Param('eventId') eventId: string) {
    return this.calendarService.getEvent(eventId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('events/:eventId')
  @ApiOperation({ summary: 'Update event' })
  async updateEvent(@Param('eventId') eventId: string, @Body() updateEventDto: UpdateEventDto) {
    return this.calendarService.updateEvent(eventId, updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('events/:eventId')
  @ApiOperation({ summary: 'Delete event' })
  async deleteEvent(@Param('eventId') eventId: string) {
    await this.calendarService.deleteEvent(eventId);
    return { message: 'Event deleted' };
  }
}
