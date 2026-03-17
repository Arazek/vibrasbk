import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { DanceStylesService } from './dance-styles.service';
import { CreateDanceStyleDto } from './dtos/create-dance-style.dto';

@ApiTags('Dance Styles')
@Controller('dance-styles')
export class DanceStylesController {
  constructor(private service: DanceStylesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List all active dance styles' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Create a dance style' })
  create(@Body() dto: CreateDanceStyleDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Update a dance style' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateDanceStyleDto>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '[Admin] Delete a dance style' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
