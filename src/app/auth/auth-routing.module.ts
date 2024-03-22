import {RouterModule, Routes} from "@angular/router";
import {IsLoggedInGuard} from "./services/is-logged-in-guard";
import {AuthenticateComponent} from "./page/authenticate/authenticate.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticateComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'register',
    component: AuthenticateComponent,
    canActivate: [IsLoggedInGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
