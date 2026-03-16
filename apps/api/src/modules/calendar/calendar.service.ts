import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEvent)
    private eventsRepository: Repository<CalendarEvent>
  ) {}

  async createEvent(userId: string, createEventDto: CreateEventDto): Promise<CalendarEvent> {
    const event = this.eventsRepository.create({
      ...createEventDto,
      createdBy: userId,
    });
    return this.eventsRepository.save(event);
  }

  async getEvents(userId: string, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    const query = this.eventsRepository.createQueryBuilder('event');

    query.where('event.createdBy = :userId OR :userId = ANY(event.attendeeIds)', { userId });

    if (startDate && endDate) {
      query.andWhere('event.startTime >= :startDate', { startDate });
      query.andWhere('event.endTime <= :endDate', { endDate });
    }

    return query.orderBy('event.startTime', 'ASC').getMany();
  }

  async getEvent(eventId: string): Promise<CalendarEvent | null> {
    return this.eventsRepository.findOne({ where: { id: eventId } });
  }

  async updateEvent(eventId: string, updateEventDto: UpdateEventDto): Promise<CalendarEvent> {
    await this.eventsRepository.update(eventId, updateEventDto);
    return this.getEvent(eventId) as Promise<CalendarEvent>;
  }

  async deleteEvent(eventId: string): Promise<void> {
    await this.eventsRepository.delete(eventId);
  }
}
