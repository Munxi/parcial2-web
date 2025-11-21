import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { Repository } from 'typeorm';
import { COUNTRY_INFO_PROVIDER } from './providers/country-info.provider';
import type { CountryInfoProvider } from './providers/country-info.provider';
import { plainToInstance } from 'class-transformer';

export class CountryResponse {
  data: CountryEntity;
  source: string;
}
@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryRepository: Repository<CountryEntity>,
    @Inject(COUNTRY_INFO_PROVIDER)
    private readonly countryProvider: CountryInfoProvider,
  ) {}
  async findAll(): Promise<CountryEntity[]> {
    return await this.countryRepository.find();
  }
  async findOne(cca3: string): Promise<CountryResponse> {
    let country = await this.countryRepository.findOne({
      where: { cca3 },
    });
    let source = 'database';
    if (!country) {
      const countryDTO = await this.countryProvider.getCountryByAPI(cca3);
      if (!countryDTO) {
        throw new NotFoundException(
          `Could not find a country with code ${cca3}`,
        );
      }
      country = plainToInstance(CountryEntity, countryDTO);
      country = await this.countryRepository.save(country);
      source = 'api';
    }
    return {
      data: country,
      source: source,
    };
  }
  async delete(cca3: string) {
    const country = await this.countryRepository.findOne({ where: { cca3 } });
    if (!country) {
      throw new NotFoundException(`Could not find a country with code ${cca3}`);
    }
    try {
      await this.countryRepository.remove(country);
    } catch (error) {
      if (error.code === '23503') {
        throw new ConflictException(
          'Country cannot be deleted because it is a destination.',
        );
      }
    }
  }
}
