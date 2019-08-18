import { Module } from '@nestjs/common';
import { taskProviders } from 'src/tasks/tasks.provider';

@Module({
  providers: [...taskProviders],
})
export class TasksModule { }