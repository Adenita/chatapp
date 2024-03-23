import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  storedUser: string = '';
  getStoredUser(user: string) {
    this.storedUser = user;
  }
}
