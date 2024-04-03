import {NgModule} from "@angular/core";
import {MessageComponent} from "./components/message/message.component";
import {RoomComponent} from "./pages/room/room.component";
import {RoomListModalComponent} from "./components/room-list-modal/room-list-modal.component";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {RoomRoutingModule} from "./room-routing.module";

@NgModule({
  declarations: [
    MessageComponent,
    RoomComponent,
    RoomListModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RoomRoutingModule,
    SharedModule
  ],
  providers: [DatePipe],
  bootstrap: []
})
export class RoomModule { }
