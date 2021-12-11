import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../../models/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  url = 'http://localhost:8089/route/';
  constructor(private http: HttpClient) { }

  getRoutes(): Observable<Route[]>{
    return this.http.get<Route[]>(this.url);
  }

  deleteRoute(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  saveRoute(route: Route): Observable<any>{
    return this.http.post(this.url, route);
  }

  getRoute(id: string): Observable<Route>{
    return this.http.get<Route>(this.url + id);
  }

  editRoute(id: string, route: Route):Observable<any>{
    return this.http.put(this.url + id, route);
  }
}
