import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  cantAsientos:number=0;

  url = 'http://localhost:8089/booking/';
  constructor(private http: HttpClient) { }


  getBookings(): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.url);
  }
  
  deleteBooking(id: string): Observable<any>{
    return this.http.delete(this.url + id);
  }

  saveBooking(booking: Booking): Observable<any>{
    return this.http.post(this.url, booking);
  }

  getBooking(id: any): Observable<Booking>{
    return this.http.get<Booking>(this.url + id);
  }

  getBookingsByFlight(id: any): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.url + "flight/" + id);
  }
  getBookingsByUser(id: any): Observable<Booking[]>{
    return this.http.get<Booking[]>(this.url + "user/" + id);
  }

  editBooking(id: string, booking: Booking):Observable<any>{
    return this.http.put(this.url + id, booking);
  }


}
