import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Task } from 'src/tasks/tasks.entity';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: number;

  @Column
  role: string;

  @HasMany(() => Task)
  tasks: Task[];
}