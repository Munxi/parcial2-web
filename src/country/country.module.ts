import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';
import { ApiProvider } from './api.provider';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryService, ApiProvider],
})
export class CountryModule {}
