import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalModule } from './rentals/rental.module';
import { ScheduledTaskModule } from './scheduled_task/scheduled_task.module';
import { createTypeOrmConfig } from './config/data-source.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ConfigModule.forRoot(), CustomerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => createTypeOrmConfig(configService),
    }),
    RentalModule,
    ScheduledTaskModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
