import { Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/core/services/register.service';
import { Account } from "../../../core/models/account";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  count:number = 0;

  @Output() addNewRecord = new EventEmitter<boolean>();

  private subs = new Subscription();
  interval : any;

  registrationForm! : FormGroup;

  constructor(
    private fb: FormBuilder,
    private _registerSer:RegisterService,
    private _route: Router,
  ) {
    this.interval = setInterval(()=>{
      this.count++;
      console.log('Time running', this.count);
    }, 1000)
  }

  updateProfile() {
    this.registrationForm.patchValue({
      firstName : 'Nancy',
      address : {
        street : '123 Drew Street'
      }
    });
  }



  onSubmit($event: Account) {
    if(this.registrationForm.valid){
      this.subs.add(this._registerSer.addAccount(this.registrationForm.value)
      .subscribe
      ({
        next:(res) => {
          // this._route.navigate(['login'])
          alert("Person account added successfully")
          // this.registrationForm.reset();
          // this.dialogRef.close('save');
        },
        error:()=>{
          alert("Username is taken. Please use a different one.")
        }
      }));
    }
  }

  get inputFirstName() { return this.registrationForm.get("firstName"); }

  get inputLastName() { return this.registrationForm.get("lastName"); }

  get inputUsername() { return this.registrationForm.get("username"); }

  get inputPassword() { return this.registrationForm.get("password"); }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName : ['',
      [Validators.required, Validators.minLength(4)]
    ],
      lastName : ['',
      [Validators.required, Validators.minLength(2)]
    ],

      street : [''],
      city : [''],
      state : [''],
      zipCode : [''],

      username : ['',
      [Validators.required, Validators.minLength(7)]
    ],
      password : ['',
      [Validators.required, Validators.minLength(8)]
    ],

    });
  }

  ngOnDestroy() {
    console.log('ngOndestroy...');
    clearInterval(this.interval);
    if (this.subs) {
      this.subs.unsubscribe();
      console.log(this.subs);
    }
  }

}

