import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, map, Subject, takeUntil} from "rxjs";
import {MessageListTransport, MessageTransport} from "../../shared/models/message";
import {RoomService} from "../../core/services/http/room.service";
import {MessageService} from "../../core/services/http/message.service";
import {UserService} from "../../core/services/http/user.service";
import {UserTransport} from "../../shared/models/user";
import {RoomTransport} from "../../shared/models/room";

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
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.messages$ = new BehaviorSubject<MessageTransport[]>([]);
  }

  ngOnInit(): void {
    this.getRoomMessages(1);
    this.getRoom(1)
      .then(() => this.getUser(1))
  }

  getRoomMessages(roomId: number) {
    this.roomService.getRoomMessages(roomId)
      .pipe(
        map(messages => messages || null),
        takeUntil(this.destroyed$))
      .subscribe({
      next: (messageListTransport: MessageListTransport) => {
        console.log(messageListTransport)
        this.messages$.next(messageListTransport.messageTransports);
      },
      error: (err) => console.error('Error fetching room messages', err),
    });
  }

  postMessage(userTransport: UserTransport, roomTransport: RoomTransport, content: string) {
    const messageTransport = {userTransport, roomTransport, content} as MessageTransport;
    this.messageService.post(messageTransport)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (messageTransport: MessageTransport) => {
          console.log(messageTransport)
          this.messageInput = '';
          this.messages$.next([messageTransport, ...this.messages$.getValue()]);
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
            console.log(roomTransport)
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
    this.postMessage(this.userTransport, this.roomTransport, this.messageInput);
  }

}
