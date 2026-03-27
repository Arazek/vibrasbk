import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { CountriesService } from './countries.service';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all supported countries ordered by name' })
  findAll() {
    return this.countriesService.findAll();
  }

  @Public()
  @Get(':countryId/cities')
  @ApiOperation({ summary: 'List cities for a country ordered by name' })
  findCities(@Param('countryId') countryId: string) {
    return this.countriesService.findCitiesByCountry(countryId);
  }
}
