import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  storedUser: string | null = null;
  getStoredUser(user: string | null) {
    this.storedUser = user;
  }
}
