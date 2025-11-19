import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { RestCountryModule } from '../restcountry/restcountry.module';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity]), RestCountryModule],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
