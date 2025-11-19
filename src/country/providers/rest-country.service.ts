/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CountryInfoDto, CountryInfoProvider } from './country-info.provider';

@Injectable()
export class RestCountryService implements CountryInfoProvider {
  private readonly apiUrl = 'https://restcountries.com/v3.1/alpha/';

  constructor(private readonly httpService: HttpService) {}

  async getCountryByAPI(cca3: string): Promise<CountryInfoDto | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.apiUrl}${cca3}`.concat(
            '?fields=cca3,name,region,subregion,capital,population,flags',
          ),
        ),
      );
      const data = response.data;
      if (!data) return null;
      return {
        cca3: data.cca3,
        name: data.name?.common || '',
        region: data.region || '',
        subregion: data.subregion || '',
        capital: data.capital[0] || 'Unknown',
        population: data.population || 0,
        flag: data.flags?.png || '',
      };
    } catch (error) {
      console.error(`Error fetching country data: ${error.message}`);
      return null;
    }
  }
}
