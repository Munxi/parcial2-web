import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}
  @Get()
  async findAll() {
    return await this.countryService.findAll();
  }
  @Get(':cca3')
  async findOne(@Param('cca3') cca3: string) {
    return await this.countryService.findOne(cca3);
  }
}
