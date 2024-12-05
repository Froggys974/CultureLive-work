import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RentalService } from 'src/rentals/rental.service';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly rentalService: RentalService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return await this.customerService.create(body);
  }

  @Get()
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.customerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return await this.customerService.update(id, body);
  }

  @Get(':id/rentals')
  async getRentalsByCustomer(@Param('id') customerId: number) {
    const rentals = await this.rentalService.findAllRentalsByCustomerId(customerId);
    if (!rentals || rentals.length === 0) {
      throw new NotFoundException(
        `No rentals found for customer ID ${customerId}`,
      );
    }
    return rentals;
  }

  @Post(':id/rentals')
  async createRentalForCustomer(
    @Param('id') customerId: number,
    @Body() body: any,
  ) {
    const {inventory_id, rental_date, return_date,staff_id } = body;

    if (!inventory_id || !rental_date || !return_date || !staff_id) {
      throw new BadRequestException(
        'Missing required fields: inventory_id, rental_date, return_date,staff_id.',
      );
    }

    return await this.rentalService.createRental({
      customer_id: customerId,
      inventory_id,
      rental_date,
      return_date,
      staff_id
    });
  }

  @Get(':id/rentals/:rentalId')
  async getOneRentalForCustomer(
    @Param('id') customerId: number,
    @Param('rentalId') rentalId: number,
  ) {
    return await this.rentalService.findOneRentalByCustomerId(customerId, rentalId);
  }
}
