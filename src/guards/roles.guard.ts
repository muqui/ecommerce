import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se requieren roles específicos, permitir el acceso
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

  //  console.log('Required Roles:', requiredRoles);
   // console.log('User:', user);

    // Validar que el usuario y sus roles existan
    if (!user || !user.roles || !Array.isArray(user.roles)) {
      throw new ForbiddenException('No tienes permiso para acceder');
    }

    // Validar que el usuario tenga al menos uno de los roles requeridos
    const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('No tienes permiso para acceder');
    }

    return true;
  }
}
