import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from "rxjs";
import {RoomTransport} from "../../shared/models/room";
import {RoomService} from "../../core/services/http/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-room-list-modal',
  templateUrl: './room-list-modal.component.html',
  styleUrls: ['./room-list-modal.component.sass']
})
export class RoomListModalComponent {
  @Input()
  rooms$!: BehaviorSubject<RoomTransport[]>;

  @Output()
  onJoinedEvent: EventEmitter<RoomTransport> = new EventEmitter<RoomTransport>();

  @Input()
  userId!: number;

  constructor(
    private activeModal: NgbActiveModal,
    private roomService: RoomService,
    private router: Router
  ) {}

  closeModal() {
    this.activeModal.close();
  }

  joinRoom(roomId: number) {
    this.roomService.joinRoom(roomId, this.userId).subscribe({
       next: () => {
         this.getRoom(roomId).then((roomTransport) => {
           this.onJoinedEvent.emit(roomTransport)
           this.router.navigate(['rooms', roomId, 'messages'])
           this.activeModal.close();
         })

       }
      }
    )
  }

  getRoom(roomId: number) {
    return new Promise<RoomTransport>((resolve, reject) => {
       this.roomService.get(roomId).subscribe({
         next: (roomTransport: RoomTransport) => {
           resolve(roomTransport)
         },
         error: () => reject()
       })
    })
  }

}
