import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { MessageComponent } from './components/message/message.component';
import { RoomComponent } from './components/room/room.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { RoomCardComponent } from './components/room-card/room-card.component';

const routes: Routes = [
  {
    path: 'rooms/:id/messages',
    component: RoomComponent,
  }
]


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MessageComponent,
    RoomComponent,
    RoomCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
