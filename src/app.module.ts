import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TravelplanModule } from './travelplan/travelplan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country/country.entity';
import { TravelPlanEntity } from './travelplan/travelplan.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    CountryModule,
    TravelplanModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'parcial2',
      entities: [CountryEntity, TravelPlanEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
