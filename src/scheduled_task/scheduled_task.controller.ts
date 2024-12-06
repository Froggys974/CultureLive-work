// src/scheduled_task/scheduled_task.controller.ts
import { Controller, Get, Param, Put, Post } from '@nestjs/common';
import { ScheduledTaskService } from './scheduled_task.service';
import { ScheduledTask } from '../entities/scheduled_task.entity';

@Controller('scheduled-tasks')
export class ScheduledTaskController {
  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  @Get()
  async findAll(): Promise<ScheduledTask[]> {
    return this.scheduledTaskService.findAllTask();
  }

  @Put('execute/:taskId')
  async executeTask(@Param('taskId') taskId: number): Promise<void> {
    return this.scheduledTaskService.executeTaskManually(taskId);
  }

  @Get('isExecuted/:taskId')
  async checkStatus(@Param('taskId') taskId: number): Promise<boolean> {
    return this.scheduledTaskService.checkExecutionStatus(taskId);
  }
}
