import { HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/models/account';
import { RegisterService } from 'src/app/core/services/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  getList: Account[] = [];

  constructor(
    private _registerSer: RegisterService,
    private _route: Router
  ) { }

  getAll(): void {
    this._registerSer.getPersonList()
    .subscribe
    ({
      next:(res)=>{
        this.getList = res;
      },
      error:(err) => {
        if (err instanceof HttpHeaderResponse) {
          if (err.status === 401) {
          }
        }
        this._route.navigate(['/login'])
      }
    })
  }

  ngOnInit() {
    this.getAll();
  }

}
