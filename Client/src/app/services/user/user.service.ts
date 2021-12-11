import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8089/user/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get(this.url);
  }

  deleteUser(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  saveUser(user: User): Observable<any>{
    return this.http.post(this.url, user);
  }

  getUser(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  editUser(id: string, user: User):Observable<any>{
    return this.http.put(this.url + id, user);
  }
}
