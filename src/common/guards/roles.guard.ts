import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = await context.switchToHttp().getRequest();
    const user = request.user;

    console.log(user)
   
    const hasRole = () =>
      user.role == roles.find(item => item === user.role);

    return user && user.role && hasRole();
  }
}