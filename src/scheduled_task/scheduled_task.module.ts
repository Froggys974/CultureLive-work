import { Global, Module } from '@nestjs/common';
import { ScheduledTaskController } from './scheduled_task.controller';
import { ScheduledTaskService } from './scheduled_task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledTask } from '../entities/scheduled_task.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ScheduledTask])],
  controllers: [ScheduledTaskController],
  providers: [ScheduledTaskService],
  exports: [ScheduledTaskService],

})
export class ScheduledTaskModule {}
