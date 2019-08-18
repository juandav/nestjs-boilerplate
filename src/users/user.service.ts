import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly usersRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.role = 'task-viewer'
    return await user.save();
  }

  async findById(id: number):Promise<User> {
    return await this.usersRepository.findByPk(id)
  }

  async findOne(query: {
    username: string,
    password: string
  }): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        username: query.username,
        password: query.password
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }

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
}