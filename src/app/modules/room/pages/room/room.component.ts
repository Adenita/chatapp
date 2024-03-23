import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, map, Subject, takeUntil} from "rxjs";
import {MessageListTransport, MessageTransport} from "../../../../shared/models/message";
import {RoomService} from "../../../../core/services/http/room.service";
import {UserService} from "../../../../core/services/http/user.service";
import {UserTransport} from "../../../../shared/models/user";
import {RoomTransport} from "../../../../shared/models/room";
import {SocketIOService} from "../../../../core/services/socket-i-o.service";
import {RouteParametersService} from "../../../../core/services/route-parameters.service";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationManagerService} from "../../../../core/services/authentication-manager.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass']
})
export class RoomComponent implements OnInit, OnDestroy {

  messages$: BehaviorSubject<MessageTransport[]>;
  destroyed$: Subject<void> = new Subject<void>();
  userTransport: UserTransport = {} as UserTransport;
  roomTransport: RoomTransport = {} as RoomTransport;
  messageInput: string = '';
  roomId: number = -1;

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private socketIOService: SocketIOService,
    private routeParametersService: RouteParametersService,
    private activatedRoute: ActivatedRoute,
    private authenticationManagerService: AuthenticationManagerService
  ) {
    this.messages$ = new BehaviorSubject<MessageTransport[]>([]);
  }

  ngOnInit(): void {
    this.routeParametersService.getRouteParams(this.activatedRoute)
      .subscribe((roomId) => {
        this.roomId = roomId;
        this.getRoom(this.roomId)
        this.getRoomMessages(this.roomId)

        const username = this.authenticationManagerService.getUsername();
        this.getUserByUsername(username)

        this.socketIOService.connectToSocket(this.roomId + "")
        this.socketIOService.receiveMessages(this.roomId).subscribe({
          next: (message) => {
            this.messages$.next([message, ...this.messages$.getValue()]);
          }
        })
      })
  }

  getRoomMessages(roomId: number) {
    this.roomService.getRoomMessages(roomId)
      .pipe(
        map(messages => messages || null),
        takeUntil(this.destroyed$))
      .subscribe({
      next: (messageListTransport: MessageListTransport) => {
        this.messages$.next(messageListTransport.messageTransports);
      },
      error: (err) => console.error('Error fetching room messages', err),
    });
  }

  getUserByUsername(username: string) {
    this.userService.getByUsername(username)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (userTransport: UserTransport) => {
          this.userTransport = userTransport;
        },
        error: (err) => console.error('Error fetching user', err),
      });
  }

  getRoom(roomId: number){
    this.roomService.get(roomId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (roomTransport: RoomTransport) => {
          this.roomTransport = roomTransport;
        },
        error: (err) => {
          console.error('Error fetching room', err)
        },
      });
  }

  sendMessage() {
    const messageTransport = {
      userTransport: this.userTransport,
      roomTransport: this.roomTransport,
      content: this.messageInput
    } as MessageTransport;

    this.socketIOService.sendMessage(messageTransport);
    this.messageInput = '';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
