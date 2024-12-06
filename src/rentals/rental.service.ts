import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledTaskService } from 'src/scheduled_task/scheduled_task.service';
import { Rental } from 'src/entities/rental.entity';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    private readonly scheduledTaskService: ScheduledTaskService
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
    const savedRental = await this.rentalRepository.save(rental);
    await this.scheduledTaskService.createScheduledTasksForRental(savedRental);
    return savedRental;
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

  async findAllRentalsByCustomerId(customer: Customer): Promise<Rental[]> {
    return await this.rentalRepository.find({
      where: { customer: customer },
    });
  }

  async findOneRentalByCustomerId(customer: Customer, id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { customer: { customer_id: customer.customer_id }, rental_id: id },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found for customer: ${customer.customer_id}`);
    }
    return rental; 
  }
  
}
