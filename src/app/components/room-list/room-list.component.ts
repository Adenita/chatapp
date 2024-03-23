import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RoomTransport} from "../../shared/models/room";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.sass']
})
export class RoomListComponent {
   @Input() rooms$!: BehaviorSubject<RoomTransport[]>;

   @Output() onClickEvent: EventEmitter<number> = new EventEmitter<number>();

    doAction(roomId: number) {
       this.onClickEvent.emit(roomId);
    }
}
