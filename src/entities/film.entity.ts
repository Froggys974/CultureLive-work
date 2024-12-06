import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
  import { Rental } from './rental.entity';
import { Rating } from 'src/enums/rating.enum';
  
  @Entity('film')
  export class Film {
    @PrimaryGeneratedColumn()
    film_id: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'integer', nullable: true })
    release_year: number;
  
    @Column({ type: 'integer', nullable: false, default: 3 })
    language_id: number;
  
    @Column({ type: 'integer', nullable: true })
    original_language: number;
  
    @Column({ type: 'smallint', nullable: false, default: 3 })
    rental_duration: number;
  
    @Column({
      type: 'numeric',
      precision: 4,
      scale: 2,
      nullable: false,
      default: 4.99,
    })
    rental_rate: number;
  
    @Column({ type: 'smallint', nullable: true })
    length: number;
  
    @Column({
      type: 'numeric',
      precision: 5,
      scale: 2,
      nullable: false,
      default: 19.99,
    })
    replacement_cost: number;
  
    @Column({
      type: 'enum',
      enum: Rating,
      default: Rating.G,
    })
    rating: Rating;
  
    @CreateDateColumn({
      type: 'timestamp without time zone',
      default: () => 'CURRENT_TIMESTAMP',
    })
    last_update: Date;
  
    @Column({ type: 'text', array: true, nullable: true })
    special_features: string[];
  
    @Column({ type: 'tsvector', nullable: true })
    fulltext: string;
  
    @OneToMany(() => Rental, (rental) => rental.film)
    rentals: Rental[];
  }
  