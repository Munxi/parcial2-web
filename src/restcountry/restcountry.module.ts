import { Module } from '@nestjs/common';
import { RestCountryService } from './restcountry.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RestCountryService],
  exports: [RestCountryService],
})
export class RestCountryModule {}
