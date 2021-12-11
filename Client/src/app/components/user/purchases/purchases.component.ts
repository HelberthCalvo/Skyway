import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking/booking.service';
import { TokenStorageService } from 'src/app/services/user/token-storage.service';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  reserveForm: FormGroup;
  isLoggedIn = false;
  userLogin: string = '';
  bookings: Booking[];
  
  constructor(private tokenStorageService: TokenStorageService, private _bookingService: BookingService,) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn, 'this.isLoggedIn');
    if (this.isLoggedIn) {
      const { user } = this.tokenStorageService.getUser();
      this.userLogin = user._id;
    }
    this.historial();
  }

  historial() {
    this._bookingService.getBookingsByUser(this.userLogin).subscribe({
      next: (data) => {
        this.bookings = data;
        console.log(data);
      },
      error: (e: any) => console.error(e),
    });
  }
}
