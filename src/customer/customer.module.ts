import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { RentalService } from 'src/rentals/rental.service';
import { Rental } from 'src/rentals/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Rental])],
  controllers: [CustomerController],
  providers: [CustomerService,RentalService]
})
export class CustomerModule {}
