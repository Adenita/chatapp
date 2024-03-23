import {Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject} from "rxjs";
import {RoomTransport} from "../../shared/models/room";
import {RoomService} from "../../core/services/http/room.service";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-room-list-modal',
  templateUrl: './room-list-modal.component.html',
  styleUrls: ['./room-list-modal.component.sass']
})
export class RoomListModalComponent {
  @Input()
  rooms$!: BehaviorSubject<RoomTransport[]>;

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

  joinRoom(roomId: number, userId: number) {
    this.roomService.joinRoom(roomId, userId).subscribe({
       next: () => {
         this.router.navigate(['rooms', roomId, 'messages'])
         this.activeModal.close();
       }
      }
    )
  }

}
