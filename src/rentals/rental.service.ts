import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from './rental.entity';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async findAllRentals(): Promise<Rental[]> {
    return await this.rentalRepository.find();
  }

  async findOneRental(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({ where: { rental_id: id } });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found.`);
    }
    return rental;
  }

  async createRental(data: Partial<Rental>): Promise<Rental> {
    const rental = this.rentalRepository.create(data);
    return await this.rentalRepository.save(rental);
  }

  async updateRental(id: number, data: Partial<Rental>): Promise<Rental> {
    const rental = await this.findOneRental(id);
    Object.assign(rental, data);
    return await this.rentalRepository.save(rental);
  }

  async deleteRentalById(id: number): Promise<void> {
    const rental = await this.findOneRental(id);
    await this.rentalRepository.remove(rental);
  }

  async findAllRentalsByCustomerId(customerId: number): Promise<Rental[]> {
    return await this.rentalRepository.find({
      where: { customer_id: customerId },
    });
  }

  async findOneRentalByCustomerId(customerId: number, id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { customer_id: customerId, rental_id: id },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found for customer: ${customerId}.`);
    }
    return rental; 
  }
  
}
