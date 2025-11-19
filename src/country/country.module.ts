import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
})
export class CountryModule {}
