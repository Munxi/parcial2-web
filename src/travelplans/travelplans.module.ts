import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlansEntity } from './travelplans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TravelPlansEntity])],
})
export class TravelplansModule {}
