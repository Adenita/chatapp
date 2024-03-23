import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

import { HomeComponent } from './pages/home/home.component';
import {IsLoggedInGuard} from "./auth/services/is-logged-in-guard";
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import {InterceptorService} from "./auth/services/interceptor.service";
import {SharedModule} from "./shared/shared.module";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'rooms',
    loadChildren: () => import('./modules/room/room.module').then((m) => m.RoomModule),
  },
]


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    SidePanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
