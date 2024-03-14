import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class DataService<T, K> {
  private _apiUrl: string = '';
  private _url = 'http://localhost:8080/api';

  protected constructor(private http: HttpClient) {}

  getAll(): Observable<K> {
    return this.http.get<K>(`${this.url + '/' + this.apiUrl}`);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.url + '/' + this.apiUrl}/${id}`);
  }

  post(entity: T): Observable<T> {
    return this.http.post<T>(`${this.url + '/' + this.apiUrl}`, entity);
  }

  update(id: number, entity: T): Observable<T> {
    return this.http.put<T>(`${this.url + '/' + this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.url + '/' + this.apiUrl}/${id}`);
  }

  set apiUrl(_apiUrl: string) {
    this._apiUrl = _apiUrl;
  }

  get apiUrl() {
    return this._apiUrl;
  }

  get url() {
    return this._url;
  }
}
