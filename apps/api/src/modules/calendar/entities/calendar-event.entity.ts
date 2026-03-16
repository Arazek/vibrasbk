import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('calendar_events')
export class CalendarEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ nullable: true })
  location: string;

  @Column()
  createdBy: string;

  @Column('uuid', { array: true, default: [] })
  attendeeIds: string[];

  @Column({ nullable: true })
  color: string;

  @Column({ default: false })
  isAllDay: boolean;

  @Column({ default: false })
  isRecurring: boolean;

  @Column({ nullable: true })
  recurrenceRule: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
