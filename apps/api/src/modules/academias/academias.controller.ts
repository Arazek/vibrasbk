import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AcademiasService } from './academias.service';
import { CreateAcademiaDto } from './dtos/create-academia.dto';

@ApiTags('Academias')
@Controller('api/academias')
export class AcademiasController {
  constructor(private service: AcademiasService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List all academias (public)' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Create an academia' })
  create(@Body() dto: CreateAcademiaDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update an academia' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateAcademiaDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Delete an academia' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
