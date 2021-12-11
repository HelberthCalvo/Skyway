import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  url = 'http://localhost:8089/flight/';
  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.url);
  }

  deleteFlight(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  saveFlight(flight: Flight): Observable<any>{
    return this.http.post(this.url, flight);
  }

  getFlight(id: any): Observable<Flight>{
    return this.http.get<Flight>(this.url + id);
  }

  getFlightByDate(id: any): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.url + "date/" + id);
  }

  editFlight(id: string, flight: Flight):Observable<any>{
    return this.http.put(this.url + id, flight);
  }
}
