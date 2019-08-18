import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';

@Table
export class Task extends Model<Task> {
  @Column
  name: string;

  //@@ ToDo, Done, Delete
  @Column
  state: string; 

  @ForeignKey(() => User)
  @Column
  userId: number;
  
  @BelongsTo(() => User)
  user: User;
}