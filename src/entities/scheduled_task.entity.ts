import { TaskType } from 'src/enums/task-type.enum';
import { Rental } from 'src/entities/rental.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('scheduled_task')
export class ScheduledTask {
  @PrimaryGeneratedColumn()
  scheduled_task_id: number;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  taskType: TaskType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  scheduledAt: Date;

  @Column({ type: 'boolean', default: false })
  isExecuted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  executedAt: Date | null;

  @ManyToOne(() => Rental, (rental) => rental.scheduledTasks)
  @JoinColumn({ name: 'rental_id' })
  rental: Rental;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
