import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DanceStyle } from './entities/dance-style.entity';
import { DanceStylesService } from './dance-styles.service';
import { DanceStylesController } from './dance-styles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DanceStyle])],
  controllers: [DanceStylesController],
  providers: [DanceStylesService],
  exports: [DanceStylesService],
})
export class DanceStylesModule {}
