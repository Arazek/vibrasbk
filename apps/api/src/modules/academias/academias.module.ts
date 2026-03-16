import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Academia } from './entities/academia.entity';
import { AcademiasService } from './academias.service';
import { AcademiasController } from './academias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Academia])],
  controllers: [AcademiasController],
  providers: [AcademiasService],
  exports: [AcademiasService],
})
export class AcademiasModule {}
