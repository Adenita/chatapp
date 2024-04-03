import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationManagerService } from '../../core/services/authentication-manager.service';
import {tap} from "rxjs";
import {StorageService} from "../../core/services/storage.service";
@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private storageService: StorageService,
    private authService: AuthenticationManagerService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageService.getAccessToken();

    if (token) {
      if (this.storageService.isTokenExpired(token)) {
        const refreshToken = this.storageService.getRefreshToken();

        if (refreshToken && !this.storageService.isTokenExpired(refreshToken)) {
          req = req.clone({
            url: 'http://localhost:8080/api/refreshToken',
            method: 'POST',
            setHeaders: {
              Authorization: `Bearer ${refreshToken}`,
            },
            body: {token, refreshToken}
          });
        }
        else {
          this.authService.logout();
        }
      }
      else {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.url?.includes('refreshToken')) {
          this.storageService.setAccessToken(event.body.token);
        }
      })
    )
  }
}
