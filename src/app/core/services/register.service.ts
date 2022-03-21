import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { Address } from "../models/address";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private rootUrl = environment.backend_url;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(
    private httpClient: HttpClient,
    private _router: Router
  ) { }

  getPersonList(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${this.rootUrl}/api/listOfAccount`);
  }

  addAccount(account:Account): Observable<Account[]> {
    return this.httpClient.post<Account[]>(`${this.rootUrl}/api/register`, account, this.httpOptions)
  }

  addAddress(address:Address): Observable<Address[]> {
    return this.httpClient.post<Address[]>(`${this.rootUrl}/api/register`, address, this.httpOptions)
  }

}
