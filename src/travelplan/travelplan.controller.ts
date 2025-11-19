import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TravelPlanService } from './travelplan.service';
import { TravelPlanDto } from './travelplan.dto';
import { TravelPlanEntity } from './travelplan.entity';
import { plainToInstance } from 'class-transformer';

@Controller('travelplan')
export class TravelplanController {
  constructor(private readonly travelService: TravelPlanService) {}

  @Get()
  async findAll() {
    return await this.travelService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.travelService.findOne(id);
  }
  @Post()
  async create(@Body() travelDto: TravelPlanDto) {
    const travel = plainToInstance(TravelPlanEntity, travelDto);
    return await this.travelService.create(travel);
  }
}
