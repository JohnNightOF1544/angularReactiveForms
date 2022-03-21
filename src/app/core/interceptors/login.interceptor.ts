import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(
    private _authSer: AuthService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this._authSer.getLoginToken();
    let newHeaders = request.headers;
    if (token) {
      newHeaders = newHeaders.append('Authorization', `Bearer ${token}`);
    }

    const authReq = request.clone({headers: newHeaders})

    return next.handle(authReq);
  }
}
