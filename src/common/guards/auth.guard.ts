import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['clave'];
    const validKey = 'salchipapa123';
    if (!apiKey) {
      throw new UnauthorizedException('La clave no existe');
    }
    if (apiKey !== validKey) {
      throw new UnauthorizedException('La clave no coincide');
    }
    return true;
  }
}
