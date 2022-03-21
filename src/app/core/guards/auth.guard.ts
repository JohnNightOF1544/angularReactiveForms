import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authSer:AuthService,
    private _router:Router
  ) {}

  canActivate(): boolean {
    if (this._authSer.checkToken()) {
      console.log('true')
      return true
    } else {
      console.log('false')
      this._router.navigate(['/login'])
      return false
    }
  }



}
