import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TravelplansModule } from './travelplans/travelplans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country/country.entity';
import { TravelPlansEntity } from './travelplans/travelplans.entity';
import { RestCountryService } from './restcountry/restcountry.service';
import { RestCountryModule } from './restcountry/restcountry.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CountryModule,
    TravelplansModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'parcial2',
      entities: [CountryEntity, TravelPlansEntity],
      synchronize: true,
    }),
    RestCountryModule,
  ],
  controllers: [AppController],
  providers: [AppService, RestCountryService],
  exports: [RestCountryService],
})
export class AppModule {}
