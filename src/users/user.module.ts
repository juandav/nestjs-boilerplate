import { Module } from '@nestjs/common';
import { userProviders } from 'src/users/user.provider';
import { UsersService } from 'src/users/user.service';
import { UsersController } from 'src/users/user.controller';

@Module({
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService]
})
export class UsersModule {}