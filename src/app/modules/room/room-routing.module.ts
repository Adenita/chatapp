import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RoomComponent} from "./pages/room/room.component";
import {IsLoggedInGuard} from "../../auth/services/is-logged-in-guard";

const routes: Routes = [
  {
    path: ':id/messages',
    component: RoomComponent,
    canActivate: [IsLoggedInGuard]
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomRoutingModule {}
