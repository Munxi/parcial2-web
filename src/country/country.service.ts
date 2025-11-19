import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { Repository } from 'typeorm';
import { RestCountryService } from '../restcountry/restcountry.service';

export class CountryResponse {
  data: CountryEntity;
  source: string;
}
@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    private readonly restService: RestCountryService,
  ) {}
  async findAll(): Promise<CountryEntity[]> {
    return await this.countryRepository.find();
  }
  async findOne(cca3: string): Promise<CountryResponse> {
    let country = await this.countryRepository.findOne({
      where: { cca3 },
    });
    if (!country) {
      country = await this.restService.getCountryByAPI(cca3);
      if (!country) {
        throw new NotFoundException(
          `Could not find a country with code ${cca3}`,
        );
      }
      country = await this.countryRepository.save(country);
      return {
        data: country,
        source: 'api',
      };
    }
    return {
      data: country,
      source: 'database',
    };
  }
}
