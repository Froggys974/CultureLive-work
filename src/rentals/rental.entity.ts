import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Customer } from '../customer/customer.entity';
  
  @Entity('rental')
  export class Rental {
    @PrimaryGeneratedColumn({ name: 'rental_id' })
    rental_id: number;
  
    @Column({ type: 'timestamp', name: 'rental_date', nullable: false })
    rental_date: Date;
  
    @Column({ type: 'integer', name: 'inventory_id', nullable: false })
    inventory_id: number;
  
    @Column({ type: 'integer', name: 'customer_id', nullable: false })
    customer_id: number;
  
    @Column({ type: 'timestamp', name: 'return_date', nullable: true })
    return_date: Date;
  
    @Column({ type: 'integer', name: 'staff_id', nullable: false })
    staff_id: number;
  
    @CreateDateColumn({ name: 'last_update', type: 'timestamp' })
    last_update: Date;
  
    @ManyToOne(() => Customer, (customer) => customer.rentals)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
    
  }
  