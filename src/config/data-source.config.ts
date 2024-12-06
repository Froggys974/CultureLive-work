// src/config/data-source.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Customer } from 'src/entities/customer.entity';
import { Rental } from 'src/entities/rental.entity';
import { ScheduledTask } from 'src/entities/scheduled_task.entity';
import { Film } from 'src/entities/film.entity';

export const createTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [Customer, Rental, ScheduledTask, Film],
    migrations: [__dirname + '/../migrations/*.ts'],
    synchronize: true,
  };
};
