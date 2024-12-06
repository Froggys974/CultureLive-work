import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledTaskController } from './scheduled_task.controller';

describe('ScheduledTaskController', () => {
  let controller: ScheduledTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduledTaskController],
    }).compile();

    controller = module.get<ScheduledTaskController>(ScheduledTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
