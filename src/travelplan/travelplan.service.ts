import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TravelPlanEntity } from './travelplan.entity';
import { CountryService } from '../country/country.service';

@Injectable()
export class TravelPlanService {
  constructor(
    @InjectRepository(TravelPlanEntity)
    private readonly travelRepository: Repository<TravelPlanEntity>,
    private readonly countryService: CountryService,
  ) {}
  async findAll(): Promise<TravelPlanEntity[]> {
    return await this.travelRepository.find();
  }
  async findOne(id: string): Promise<TravelPlanEntity> {
    const travel = await this.travelRepository.findOne({
      where: { id },
      relations: ['country_dest'],
    });
    if (!travel) {
      throw new NotFoundException(`Travel plan with id ${id} not found.`);
    }
    return travel;
  }

  async create(travel: TravelPlanEntity): Promise<TravelPlanEntity> {
    const country = await this.countryService.findOne(travel.cca3);
    travel.country_dest = country.data;
    return await this.travelRepository.save(travel);
  }
}
