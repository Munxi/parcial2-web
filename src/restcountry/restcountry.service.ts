/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { CountryEntity } from '../country/country.entity';

export class CountryDto {
  cca3: string;
  name: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  flag: string;
}

@Injectable()
export class RestCountryService {
  private readonly apiUrl = 'https://restcountries.com/v3.1/alpha/';

  constructor(private readonly httpService: HttpService) {}

  async getCountryByAPI(cca3: string): Promise<CountryEntity> {
    const country: CountryDto = {
      cca3: '',
      name: '',
      region: '',
      subregion: '',
      capital: '',
      population: 0,
      flag: '',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}${cca3}`),
      );
      const data = response.data[0];
      country.cca3 = data.cca3;
      country.name = data.name.common || '';
      country.region = data.region || '';
      country.subregion = data.subregion || '';
      country.capital = data.capital ? data.capital[0] : 'Unknown';
      country.population = data.population || 0;
      country.flag = data.flags.png || '';
      return plainToInstance(CountryEntity, country);
    } catch (error) {
      console.error(`Error fetching country data: ${error.message}`);
      return Promise.reject(new Error('Could not fetch country data'));
    }
  }
}
