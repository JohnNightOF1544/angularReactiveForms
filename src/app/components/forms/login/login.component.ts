import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from "../../../core/models/account";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private subs = new Subscription();

  count: number = 0;

  interval : any;

  loginForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authSer: AuthService,
    private _route: Router
  ) {
    this.interval = setInterval(()=>{
      this.count++;
      console.log('Time running', this.count)
    }, 3000)
  }

  onSubmit($event: Account) {
    if (this.loginForm.valid) {
      this.subs.add(this._authSer.login(this.loginForm.value)
      .subscribe
      ({
        next:(res:any) => {
          console.log(res);
          localStorage.setItem('refreshToken', res.refresh_token);
          this._route.navigate(['/home']);
          // alert("Successfully login.");
          // this.loginForm.reset();
        },
        error:()=>{
          alert("Please type your usename or password correctly.")
        }
      }))
    }
  }

  get loginUsername() {return this.loginForm.get("username");}

  get loginPassword() {return this.loginForm.get("password");}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username : ['',
      [Validators.required, Validators.minLength(7)]
    ],
      password : ['',
      [Validators.required, Validators.minLength(8)]
    ]
    });

  }

  ngOnDestroy(): void {
    console.log('ngOndestroy...');
    clearInterval(this.interval)
    if (this.subs) {
      this.subs.unsubscribe();
      console.log(this.subs)
    }
  }

}
