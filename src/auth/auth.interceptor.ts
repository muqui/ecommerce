import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    console.log(`Correo interceptado: ${body.email}`)

    if (body.email) {
      body.email = body.email.toLowerCase();  // Convertir email a minúsculas
    }

    return next.handle().pipe(
      map((data) => data)
    );
  }
  
}
