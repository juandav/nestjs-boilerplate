import { Task } from 'src/tasks/tasks.entity';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useValue: Task,
  },
];