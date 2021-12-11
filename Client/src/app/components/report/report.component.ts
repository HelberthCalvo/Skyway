import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking/booking.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  bookings: Booking[];

  constructor(private _bookingService: BookingService) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(){
    this._bookingService
    // .getBookingsByFlight('61ae814f3846b88c23e2eebe')
    .getBookings()
    .subscribe({
      next: (data) => {
        this.bookings = data;
        console.log(data);
      },
      error: (e: any) => console.error(e),
    });
  }

}
