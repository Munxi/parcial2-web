import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from './country/country.module';
import { TravelplansModule } from './travelplans/travelplans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from './country/country.entity';
import { TravelPlansEntity } from './travelplans/travelplans.entity';

@Module({
  imports: [
    CountryModule,
    TravelplansModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
