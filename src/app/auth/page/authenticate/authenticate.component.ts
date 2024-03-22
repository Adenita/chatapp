import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {Role} from "../../../shared/models/user";

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.sass']
})
export class AuthenticateComponent {
  form: FormGroup;
  register: boolean = false;
  constructor(formBuilder: FormBuilder, activatedRoute: ActivatedRoute) {
    this.register = this.containsPath(activatedRoute.snapshot, 'register')
    this.form = this.register ? this.buildRegisterForm(formBuilder)
                              : this.buildLoginForm(formBuilder);
  }

  buildLoginForm(formBuilder: FormBuilder) {
    return formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  buildRegisterForm(formBuilder: FormBuilder) {
    return formBuilder.group({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: Role.USER
    });
  }

  containsPath(route: ActivatedRouteSnapshot, path: string) {
    return !!route.url.find((segment) => segment.path.includes(path))
  }
}
