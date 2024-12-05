import {
    Controller,
    Get,
    Delete,
    Param,
    Body,
    NotFoundException,
    Put,
  } from '@nestjs/common';
  import { RentalService } from './rental.service';
  
  @Controller('rentals')
  export class RentalController {
    constructor(private readonly rentalService: RentalService) {}
  
    @Get()
    async findAllRentals() {
      return await this.rentalService.findAllRentals();
    }
  
    @Get(':id')
    async findRentalById(@Param('id') id: number) {
      const rental = await this.rentalService.findOneRental(id);
      if (!rental) {
        throw new NotFoundException(`Rental with ID ${id} not found.`);
      }
      return rental;
    }
  
    @Put(':id')
    async updateRental(@Param('id') id: number, @Body() body: any) {
      return await this.rentalService.updateRental(id, body);
    }
  
    @Delete(':id')
    async deleteRental(@Param('id') id: number) {
      const rental = await this.rentalService.findOneRental(id);
      if (!rental) {
        throw new NotFoundException(`Rental with ID ${id} not found.`);
      }
      return await this.rentalService.deleteRentalById(id);
    }
  }
  