import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from './services/register.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthDeactGuard } from './guards/auth-deact.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './interceptors/login.interceptor';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  providers: [
    RegisterService,
    AuthService,
    AuthGuard,
    AuthDeactGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi:true
    }
  ],
})
export class CoreModule { }
