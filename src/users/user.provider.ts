import { User } from 'src/users/users.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];