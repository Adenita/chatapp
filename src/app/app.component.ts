import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {RoomListTransport, RoomTransport} from "./shared/models/room";
import {RoomService} from "./core/services/http/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  rooms$: BehaviorSubject<RoomTransport[]>;
  destroyed$: Subject<void> = new Subject<void>();
  constructor(
    private roomService: RoomService,
    private router: Router
  ) {
    this.rooms$ = new BehaviorSubject<RoomTransport[]>([]);
  }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.roomService.getAll()
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
}
