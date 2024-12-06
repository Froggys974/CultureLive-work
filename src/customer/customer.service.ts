import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(body: Partial<Customer>): Promise<Customer> {
  const customer = this.customerRepository.create(body);

  return await this.customerRepository.save(customer);
}


  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerRepository.findOne({
        where: { customer_id: id },
      });
  }

  async update(id: number, body: any): Promise<Customer> {
    await this.customerRepository.update(id, body);
    return await this.customerRepository.findOne({
        where: { customer_id: id },
      });
  }
}
