import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteParametersService {
  private _roomId: number | null = null;
  getRouteParams(activatedRoute: ActivatedRoute): Observable<number> {
    return new Observable<number>((observer) => {
      activatedRoute.params.subscribe((params) => {
        this._roomId = +params['id'] || null;
        observer.next(this.roomId);
      });
    });
  }

  get roomId(): number {
    return this._roomId ?? -1;
  }
}
