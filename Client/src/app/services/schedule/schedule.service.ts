import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  url = 'http://localhost:8089/schedule/';

  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.url);
  }

  deleteSchedule(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  saveSchedule(schedule: Schedule): Observable<any>{
    return this.http.post(this.url, schedule);
  }

  getSchedule(id: string): Observable<Schedule>{
    return this.http.get<Schedule>(this.url + id);
  }

  editSchedule(id: string, schedule: Schedule):Observable<any>{
    return this.http.put(this.url + id, schedule);
  }

}
