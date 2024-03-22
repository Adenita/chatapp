import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthenticationManagerService} from "../../../core/services/authentication-manager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  @Input() form!: FormGroup

  constructor(private authenticationManagerService: AuthenticationManagerService,
              private router: Router
  ) {}

  register() {
    this.authenticationManagerService.register(this.form)
  }

  goToLoginForm() {
    this.router.navigate(['login']);
  }

}
