import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  constructor(
    private _authServ: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler): Observable<HttpEvent<unknown>> {

    const revokeToken = this._authServ.logoutIntercept();
    console.log(revokeToken)

    let authHeader = request.headers;

    if ( revokeToken ) {
      authHeader = authHeader.append('Authorization', `Bearer ${revokeToken}`);
      console.log(revokeToken);
    }

    const revokeReq = request.clone({headers: authHeader});

    return next.handle(revokeReq);
  }
}
