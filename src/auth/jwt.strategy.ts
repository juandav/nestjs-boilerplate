import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { JWT_KEY } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_KEY,
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authService.validateUser(payload);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}