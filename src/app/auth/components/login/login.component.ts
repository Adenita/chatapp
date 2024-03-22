import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationManagerService} from "../../../core/services/authentication-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  @Input() form!: FormGroup

  constructor(private authenticationManagerService: AuthenticationManagerService,
              private router: Router
  ) {}

  login() {
    this.authenticationManagerService.login(this.form);
  }

  goToRegisterForm() {
    this.router.navigate(['register']);
  }

}
