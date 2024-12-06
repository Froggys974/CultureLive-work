import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { RentalService } from 'src/rentals/rental.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/dto/update-customer.dto';
import { CreateRentalDto } from 'src/dto/create-rental.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly rentalService: RentalService,
  ) {}

  @Post()
  async create(@Body() body: CreateCustomerDto) {
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
  async update(@Param('id') id: number, @Body() body: UpdateCustomerDto) {
    return await this.customerService.update(id, body);
  }

  @Get(':id/rentals')
  async getRentalsByCustomer(@Param('id') customerId: number) {
    const customer = await this.customerService.findOne(customerId);
    const rentals = await this.rentalService.findAllRentalsByCustomerId(customer);
    if (!rentals || rentals.length === 0) {
      throw new NotFoundException(
        `No rentals found for customer ${customerId}`,
      );
    }
    return rentals;
  }

  @Post(':id/rentals')
  async createRentalForCustomer(
    @Param('id') customerId: number,
    @Body() body: CreateRentalDto,
  ) {
    const customer = await this.customerService.findOne(customerId);
    if (!customer) {
        throw new NotFoundException(
            `No customer ${customerId} found`,
          );
    }
    return await this.rentalService.createRental(body);
  }

  @Get(':id/rentals/:rentalId')
  async getOneRentalForCustomer(
    @Param('id') customerId: number,
    @Param('rentalId') rentalId: number,
  ) {
    const customer = await this.customerService.findOne(customerId);

    return await this.rentalService.findOneRentalByCustomerId(customer, rentalId);
  }
}
