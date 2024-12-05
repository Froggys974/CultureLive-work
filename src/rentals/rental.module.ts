import { Module } from '@nestjs/common';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { Rental } from './rental.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalController],
  providers: [RentalService]
})
export class RentalModule {}
