export class CountryInfoDto {
  cca3: string;
  name: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  flag: string;
}

export interface CountryInfoProvider {
  getCountryByAPI(cca3: string): Promise<CountryInfoDto | null>;
}

export const COUNTRY_INFO_PROVIDER = 'COUNTRY_INFO_PROVIDER';
