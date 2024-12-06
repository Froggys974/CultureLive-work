import { Rental } from 'src/entities/rental.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 45 })
  first_name: string;

  @Column({ length: 45 })
  last_name: string;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column()
  address_id: number;

  @Column()
  store_id: number;

  @Column({ default: true })
  activebool: boolean;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  create_date: string;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  last_update: string;

  @OneToMany(() => Rental, rental => rental.customer)
  rentals: Rental[];
}
