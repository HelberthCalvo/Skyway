import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaneType} from 'src/app/models/planeType';

@Injectable({
  providedIn: 'root'
})
export class PlaneTypeService {
  url = 'http://localhost:8089/planetype/';
  constructor(private http: HttpClient) { }

  getPlaneTypes(): Observable<any>{
    return this.http.get(this.url);
  }

  deletePlaneType(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  savePlaneType(planeType: PlaneType): Observable<any>{
    return this.http.post(this.url, planeType);
  }

  getPlaneType(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  editPlaneType(id: string, planeType: PlaneType):Observable<any>{
    return this.http.put(this.url + id, planeType);
  }
}
