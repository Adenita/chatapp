import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {RoomListTransport, RoomTransport} from "../../shared/models/room";
import {RoomService} from "../../core/services/http/room.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {RoomListModalComponent} from "../../modules/room/components/room-list-modal/room-list-modal.component";
import {UserTransport} from "../../shared/models/user";
import {Router} from "@angular/router";
import {AuthenticationManagerService} from "../../core/services/authentication-manager.service";
import {UserService} from "../../core/services/http/user.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.sass']
})
export class SidePanelComponent implements OnInit, OnDestroy {
  user: UserTransport = {} as UserTransport;

  channels$: BehaviorSubject<RoomTransport[]>;
  users$: BehaviorSubject<RoomTransport[]>;
  allChannels$: BehaviorSubject<RoomTransport[]>;
  destroyed$: Subject<void> = new Subject<void>();

  loggedIn: boolean = false;

  @Output()
  onStoredUserEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private router: Router,
    private authenticationManagerService: AuthenticationManagerService,
    private modalService: NgbModal,
  ) {
    this.channels$ = new BehaviorSubject<RoomTransport[]>([]);
    this.users$ = new BehaviorSubject<RoomTransport[]>([]);
    this.allChannels$ = new BehaviorSubject<RoomTransport[]>([]);
  }

  ngOnInit(): void {
    this.authenticationManagerService.storedUser$.subscribe((user) => {
      this.loggedIn = this.authenticationManagerService.isLoggedIn();

      if (user) {
        this.onStoredUserEvent.emit(user);
        this.getUserByUsername(user).then((user) => {
          this.user = user;
          this.getUserChannels(user.id);
          this.getUserDMs(user.id);
          this.getAvailableNonUserChannels(user.id);
        })
      }
    })
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


  openJoinModal() {
    const modalRef: NgbModalRef = this.modalService.open(RoomListModalComponent);
    modalRef.componentInstance.rooms$ = this.allChannels$;
    modalRef.componentInstance.userId = this.user.id;
    modalRef.componentInstance.onJoinedEvent.subscribe((room: RoomTransport) => {
      this.channels$.next([...this.channels$.getValue(), room])
    })
  }

  openCreateModal() {}

  getUserChannels(userId: number) {
    this.userService.getUserChannels(userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (roomListTransport: RoomListTransport) => {
          this.channels$.next(roomListTransport.roomTransports);
        },
        error: (err) => console.error('Error fetching rooms', err),
      });
  }

  getAvailableNonUserChannels(userId: number) {
    this.userService.getAvailableNonUserChannels(userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (roomListTransport: RoomListTransport) => {
          this.allChannels$.next(roomListTransport.roomTransports);
        },
        error: (err) => console.error('Error fetching rooms', err),
      });
  }

  getUserDMs(userId: number) {
    this.userService.getUserDMs(userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (roomListTransport: RoomListTransport) => {
          this.users$.next(roomListTransport.roomTransports);
        },
        error: (err) => console.error('Error fetching rooms', err),
      });
  }

  getAllChannels() {
    this.roomService.getAll()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (roomListTransport: RoomListTransport) => {
          this.allChannels$.next(roomListTransport.roomTransports);
        },
        error: (err) => console.error('Error fetching rooms', err),
      });
  }

  navigateToPage(id: number) {
    this.router.navigate(['rooms', id, 'messages']);
  }

  logout() {
    this.user = {} as UserTransport;
    this.onStoredUserEvent.emit('');
    this.authenticationManagerService.logout();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
