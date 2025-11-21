import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CountryService } from './country.service';
import { AuthGuard } from '../common/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  @Delete(':cca3')
  async delete(@Param('cca3') cca3: string) {
    return await this.countryService.delete(cca3);
  }
}
