import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import {HttpClientModule} from "@angular/common/http";
import {AuthenticateComponent} from "./page/authenticate/authenticate.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [AuthenticateComponent, LoginComponent, RegisterComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, HttpClientModule],
})
export class AuthModule {}
