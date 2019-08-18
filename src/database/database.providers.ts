import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';
import { Task } from 'src/tasks/tasks.entity';
import * as path from 'path'

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const dbPath = path.resolve(__dirname, 'database.sqlite')
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        database: 'milocredit',
        username: 'milocredit',
        password: 'milocredit',
      });
      sequelize.addModels([User, Task]);
      await sequelize.sync();
      return sequelize;
    },
  },
];