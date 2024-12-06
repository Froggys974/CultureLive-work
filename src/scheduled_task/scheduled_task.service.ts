import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { ScheduledTask } from '../entities/scheduled_task.entity';
import { Rental } from 'src/entities/rental.entity';
import { TaskType } from 'src/enums/task-type.enum';
import { Cron } from '@nestjs/schedule';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class ScheduledTaskService {
  constructor(
    @InjectRepository(ScheduledTask)
    private scheduledTaskRepository: Repository<ScheduledTask>,
  ) {}

  async createScheduledTasksForRental(
    rental: Rental,
  ): Promise<ScheduledTask[]> {
    const tasks = [];

    //create task
    const taskJ5 = this.scheduledTaskRepository.create({
      taskType: TaskType.EMAIL_REMINDER_J5,
      description: `Send mail at J-5 for rental ${rental.rental_id} `,
      scheduledAt: this.findScheduledAt(rental, TaskType.EMAIL_REMINDER_J5),
      rental: rental,
    });
    tasks.push(await this.scheduledTaskRepository.save(taskJ5));

    const taskJ3 = this.scheduledTaskRepository.create({
      taskType: TaskType.EMAIL_REMINDER_J3,
      description: `Send mail at  J-3 for rental ${rental.rental_id}`,
      scheduledAt: this.findScheduledAt(rental, TaskType.EMAIL_REMINDER_J3),
      rental: rental,
    });
    tasks.push(await this.scheduledTaskRepository.save(taskJ3));

    return tasks;
  }

  //function to find the scheduled date
  private findScheduledAt(rental: Rental, taskType: TaskType): Date {
    const returnDate = new Date(rental.return_date);
    let scheduledAt = new Date(returnDate);
    if (taskType === TaskType.EMAIL_REMINDER_J5) {
      scheduledAt.setDate(returnDate.getDate() - 5);
    } else if (taskType === TaskType.EMAIL_REMINDER_J3) {
      scheduledAt.setDate(returnDate.getDate() - 3);
    }
    scheduledAt.setHours(12, 0, 0, 0);
    return scheduledAt;
  }

  //cron job to execute the task at 12:00 every day
  @Cron('0 0 12 * * *')
  async handleCron() {
    const now = new Date();

    const tasksToExecute = await this.scheduledTaskRepository.find({
      where: {
        // compare only the date part of the scheduledAt not the hours
        scheduledAt: Raw(
          (alias) => `
      TO_CHAR(${alias}, 'YYYY-MM-DD') = TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD')`,
        ),
        isExecuted: false,
      },
      relations: ['rental', 'rental.customer'],
    });

    for (const task of tasksToExecute) {
      console.log(
        `Simulation of auto sending mail for the task: ${task.scheduled_task_id}`,
      );
      this.sendNotificationsByMail(task.taskType, task.rental.customer);
      task.isExecuted = true;
      task.executedAt = now;
      await this.scheduledTaskRepository.save(task);
    }
  }

  async findAllTask(): Promise<ScheduledTask[]> {
    return await this.scheduledTaskRepository.find();
  }

  async executeTaskManually(taskId: number): Promise<void> {
    const task = await this.scheduledTaskRepository.findOne({
      where: {
        scheduled_task_id: taskId,
        isExecuted: false,
      },
      relations: ['rental', 'rental.customer'],
    });
    if (!task) {
      throw new NotFoundException('Task not found or already validated');
    }

    console.log(
      `Simulation of manual sending mail for the task: ${task.scheduled_task_id}`,
    );

    this.sendNotificationsByMail(task.taskType, task.rental.customer);

    task.isExecuted = true;
    task.executedAt = new Date();
    await this.scheduledTaskRepository.save(task);
  }

  async checkExecutionStatus(taskId: number): Promise<boolean> {
    const task = await this.scheduledTaskRepository.findOneBy({
      scheduled_task_id: taskId,
    });

    if (!task) {
      throw new Error('Task not found');
    }
    return task.isExecuted;
  }

  //function to send mail (just log) TODO: implement mail service
  private sendNotificationsByMail(
    taskType: TaskType,
    customer: Customer,
  ): void {
    if (!customer.email) {
      throw new NotFoundException(
        `No email found for customer ${customer.customer_id}`,
      );
    }
    if (taskType === TaskType.EMAIL_REMINDER_J5) {
      console.log(
        `Mail J-5 sended to customer ${customer.last_name} ${customer.first_name} with email ${customer.email}`,
      );
    } else if (taskType === TaskType.EMAIL_REMINDER_J3) {
      console.log(
        `Mail J-3 sended to customer ${customer.last_name} ${customer.first_name} with email ${customer.email}`,
      );
    }
  }
}
