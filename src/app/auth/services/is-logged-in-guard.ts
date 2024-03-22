import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationManagerService} from "../../core/services/authentication-manager.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private authService: AuthenticationManagerService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.containsPath(route, 'login')) {
        this.router.navigate(["/"]);
        return false;
      }
      return true;
    }
    else {
      if (this.containsPath(route, 'login') || this.containsPath(route, 'register')) {
        return true;
      }

      this.router.navigate(["/login"]);
      return false;
    }
  }

  containsPath(route: ActivatedRouteSnapshot, path: string) {
     return !!route.url.find((segment) => segment.path.includes(path))
  }
}
