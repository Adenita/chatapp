import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, map, Subject, takeUntil} from "rxjs";
import {MessageListTransport, MessageTransport} from "../../shared/models/message";
import {RoomService} from "../../core/services/http/room.service";
import {UserService} from "../../core/services/http/user.service";
import {UserTransport} from "../../shared/models/user";
import {RoomTransport} from "../../shared/models/room";
import {SocketIOService} from "../../core/services/socket-i-o.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass']
})
export class RoomComponent implements OnInit {

  messages$: BehaviorSubject<MessageTransport[]>;
  destroyed$: Subject<void> = new Subject<void>();
  userTransport: UserTransport = {} as UserTransport;
  roomTransport: RoomTransport = {} as RoomTransport;
  messageInput: string = '';

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private socketIOService: SocketIOService
  ) {
    this.messages$ = new BehaviorSubject<MessageTransport[]>([]);
  }

  ngOnInit(): void {
    this.getRoomMessages(1);
    this.getRoom(1)
      .then(() => this.getUser(1))
      .then(() => {
        this.socketIOService.connectToSocket(this.roomTransport.id + "")
        this.socketIOService.receiveMessages(1).subscribe({
          next: (message) => {
            console.log("received message: ", message)
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

  getUser(userId: number) {
    this.userService.get(userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (userTransport: UserTransport) => {
          console.log(userTransport)
          this.userTransport = userTransport;
        },
        error: (err) => console.error('Error fetching user', err),
      });
  }

  getRoom(roomId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.roomService.get(roomId)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (roomTransport: RoomTransport) => {
            this.roomTransport = roomTransport;
            resolve();
          },
          error: (err) => {
            console.error('Error fetching room', err)
            reject();
          },
        });
    })

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

}
