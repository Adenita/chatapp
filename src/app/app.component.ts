import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {RoomListTransport, RoomTransport} from "./shared/models/room";
import {Router} from "@angular/router";
import {AuthenticationManagerService} from "./core/services/authentication-manager.service";
import {UserTransport} from "./shared/models/user";
import {UserService} from "./core/services/http/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  rooms$: BehaviorSubject<RoomTransport[]>;
  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private authenticationManagerService: AuthenticationManagerService
  ) {
    this.rooms$ = new BehaviorSubject<RoomTransport[]>([]);
  }

  ngOnInit(): void {
    if (this.getUser()) {
      this.getUserByUsername(this.getUser()).then((user) => {
        console.log("fetched user id: ", user.id)
        this.getUserRooms(user.id)
      })
    }
  }

  getUserRooms(userId: number) {
    this.userService.getUserRooms(userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (roomListTransport: RoomListTransport) => {
          console.log(roomListTransport)
          this.rooms$.next(roomListTransport.roomTransports);
        },
        error: (err) => console.error('Error fetching rooms', err),
      });
  }

  navigateToPage(id: number) {
    this.router.navigate(['rooms', id, 'messages']);
  }

  getUser() {
    return this.authenticationManagerService.getUser();
  }

  getUserByUsername(username: string): Promise<UserTransport> {
    return new Promise<UserTransport>((resolve, reject) => {
      this.userService.getByUsername(username)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (userTransport: UserTransport) => {
            resolve(userTransport);
          },
          error: (err) => {
            console.error('Error fetching user', err);
            reject();
          },
        });
    })
  }
}
