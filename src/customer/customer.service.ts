import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Créer un client
  async create(body: any): Promise<Customer> {
    
  const { first_name, last_name, email, address_id,store_id, active = true } = body;

  const customer = this.customerRepository.create({
    first_name,
    last_name,
    email,
    address_id,
    active,
    store_id
  });

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
