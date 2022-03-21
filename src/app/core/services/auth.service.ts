import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rootUrl = environment.backend_url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  }

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) { }

 login(account:Account): Observable<Account> {
   return this.httpClient.post<Account>(`${this.rootUrl}/api/login`, account, this.httpOptions);
 }

 checkToken() {
  return !!localStorage.getItem('refreshToken');
 }

 getLoginToken() {
   return localStorage.getItem('refreshToken');
 }

 logout() {
   return localStorage.clear();
 }

 logoutIntercept() {

  return localStorage.getItem('refreshToken');


 }






















}
