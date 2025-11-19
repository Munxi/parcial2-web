import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { Repository } from 'typeorm';
import { ApiProvider } from './api.provider';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    private readonly apiprovider: ApiProvider,
  ) {}
  async findAll(): Promise<CountryEntity[]> {
    return await this.countryRepository.find();
  }
  async findOne(cca3: string): Promise<CountryEntity> {
    let country = await this.countryRepository.findOne({
      where: { cca3 },
    });
    if (!country) {
      country = await this.apiprovider.getCountryByAPI(cca3);
      return await this.countryRepository.save(country);
    }
    return country;
  }
}
