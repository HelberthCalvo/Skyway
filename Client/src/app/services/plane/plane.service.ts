import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plane } from 'src/app/models/plane';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  url = 'http://localhost:8089/plane/';
  constructor(private http: HttpClient) { }

  getPlanes(): Observable<Plane[]>{
    return this.http.get<Plane[]>(this.url);
  }

  deletePlane(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  savePlane(plane: Plane): Observable<any>{
    return this.http.post(this.url, plane);
  }

  getPlane(id: any): Observable<Plane>{
    return this.http.get<Plane>(this.url + id);
  }

  editPlane(id: string, plane: Plane):Observable<any>{
    return this.http.put(this.url + id, plane);
  }
}
