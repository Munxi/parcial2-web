import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlanEntity } from './travelplan.entity';
import { TravelplanController } from './travelplan.controller';
import { TravelPlanService } from './travelplan.service';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([TravelPlanEntity]), CountryModule],
  controllers: [TravelplanController],
  providers: [TravelPlanService],
})
export class TravelplanModule {}
