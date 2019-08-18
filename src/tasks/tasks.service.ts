import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/tasks.entity';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY') private readonly tasksRepository: typeof Task,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.name = createTaskDto.name;
    task.state = 'ToDo';
    task.userId = createTaskDto.userId;

    return await task.save();
  }

  async findByUser(userId): Promise<Task[]> {
    return await this.tasksRepository.findAll<Task>({
      where: {
        userId
      }
    });
  }

  /*
  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.usersRepository.update<User>({
      ...updateUserDto
    }, {
      where: {
        id
      }
    });
  }

  async delete(id: number): Promise<any> {
    return await this.usersRepository.destroy({
      where: {
        id
      }
    });
  }
  */
}