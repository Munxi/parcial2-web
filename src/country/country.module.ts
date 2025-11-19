import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { COUNTRY_INFO_PROVIDER } from './providers/country-info.provider';
import { RestCountryService } from './providers/rest-country.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity]), HttpModule],
  providers: [
    CountryService,
    {
      provide: COUNTRY_INFO_PROVIDER,
      useClass: RestCountryService,
    },
  ],
  controllers: [CountryController],
  exports: [CountryService],
})
export class CountryModule {}
