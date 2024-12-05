import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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
}
