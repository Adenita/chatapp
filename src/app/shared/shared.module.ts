import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoomListComponent} from "./components/room-list/room-list.component";

@NgModule({
  declarations: [RoomListComponent],
  providers: [],
  imports: [CommonModule],
  exports: [
    RoomListComponent
  ]
})
export class SharedModule {}
