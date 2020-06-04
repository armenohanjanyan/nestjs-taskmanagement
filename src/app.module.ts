import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.confog';
import { TaskRepository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    TypeOrmModule.forRoot(TypeOrmConfig),
    TasksModule,
    AuthModule
  ],
  providers: [TasksService],
})
export class AppModule {}
