import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { TasksService } from 'src/tasks/tasks.service';
// import { Task } from 'src/tasks/tasks.entity';

@Controller('tasks')
export class UsersController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    await this.tasksService.create(createTaskDto);
  }
}