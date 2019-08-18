import {
  Controller,
  Post,
  Body,
  UseFilters,
  UsePipes,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { HttpExceptionFilter } from 'src/auth/filters/http-exception.filter';
import { BadRequestException } from 'src/common/exceptions';
import { JoiValidationPipe } from 'src/auth/pipes/joi.pipe';
import { loginSchema } from 'src/auth/schemas';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {  }
 
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new JoiValidationPipe(loginSchema))
  async login(@Body() body:{
    username: string,
    password: string
  }, @Req() request, @Res() response): Promise<Object> {
    const data = await this.authService.login(
      body.username, 
      body.password
    );
    
    if(data) {
      const statusCode = 200;
      return response.status(statusCode).send({
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        data: {
          token: await this.authService.createToken(data['dataValues']),
          detail: data
        }
      })
    } else {
      throw new BadRequestException("The user could not authenticate, because their credentials are incorrect");
    }
  }
}