import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param,
  UseGuards,
  Req,
  Res 
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/user.service';
import { InternalServerError } from 'src/common/exceptions';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Roles('admin')
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request, 
    @Res() response: Response
  ): Promise<any> {
    let statusCode = 201;
    try {
      const userCreated = await this.usersService.create(createUserDto);
      return response.status(statusCode).send({
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        payload: userCreated['dataValues']
      })
    } catch (error) {
      statusCode = 500;
      console.error(`Endpoint create user: ${error.message}`)
      throw new InternalServerError(error.message);
    }
  }
  
  @Roles('admin')
  @Get()
  async findAll(
    @Req() request, 
    @Res() response: Response,
    @CurrentUser() user
  ): Promise<any> {
    console.log(user)
    let statusCode = 200;
    try {
      const usersFound =  await this.usersService.findAll();
      return response.status(statusCode).send({
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        payload: usersFound
      })
    } catch (error) {
      statusCode = 500;
      console.error(`Endpoint all users: ${error.message}`)
      throw new InternalServerError(error.message);
    }
  }

  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request, 
    @Res() response: Response
  ): Promise<any> {
    let statusCode = 200;
    try {
      const userUpdated =  await this.usersService.update(id, updateUserDto);
      return response.status(statusCode).send({
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        payload: userUpdated
      })
    } catch (error) {
      statusCode = 500;
      console.error(`Endpoint update user: ${error.message}`)
      throw new InternalServerError(error.message);
    }
  }

  @Roles('admin')
  @Delete(':id')
  async delete(
    @Param('id') id,
    @Req() request: Request, 
    @Res() response: Response
  ): Promise<any> {
    let statusCode = 200;
    try {
      //ToDo: validate boolean value
      const userDeleted =  await this.usersService.delete(id);;
      return response.status(statusCode).send({
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        payload: userDeleted
      })
    } catch (error) {
      statusCode = 500;
      console.error(`Endpoint delete user: ${error.message}`)
      throw new InternalServerError(error.message);
    }
  }
}