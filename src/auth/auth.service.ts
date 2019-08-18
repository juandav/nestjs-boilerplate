import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { JWT_EXPIRE } from 'src/constants';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public login(
    email: string, 
    password: string
  ): Promise<Object> {
    return this.usersService.findOne({
      username: email,
      password
    })
    .then(data => data)
    .catch(error => Promise.reject(error));
  }
  
  public async createToken(payload: Object) {
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn: JWT_EXPIRE,
      accessToken,
    };
  }

  public async validateUser(payload: IJwtPayload): Promise<any> {
    //@@ ToDo put some validation logic here
    return await payload;
  }
}