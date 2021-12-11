import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Booking } from 'src/app/models/booking';
import { Flight } from 'src/app/models/flight';
import { Plane } from 'src/app/models/plane';
import { PlaneType } from 'src/app/models/planeType';
import { BookingService } from 'src/app/services/booking/booking.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { PlaneTypeService } from 'src/app/services/planeType/plane-type.service';
import { TokenStorageService } from 'src/app/services/user/token-storage.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
})
export class CheckInComponent implements OnInit {

  isLoggedIn = false;
  userLogin: string = '';

  bookings1: Booking[];
  bookings2: Booking[];
  flighta: Flight = new Flight();
  flightb: Flight = new Flight();
  plane1: Plane;
  plane2: Plane;
  planeType1: PlaneType;
  planeType2: PlaneType;
  butacas: string[] = [];
  butacas2: string[] = [];
  flightId1: string | null;
  flightId2: string | null;
  cant: string | null;
  cantSelec1: number = 0;
  cantSelec2: number = 0;
  subtotal: number=0;
  impuesto: number=0;
  total: number=0;
  constructor(
    private _bookingService: BookingService,
    private _flightService: FlightService,
    private toastr: ToastrService,
    private _planeTypeService: PlaneTypeService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
    this.flightId1 = this.aRouter.snapshot.paramMap.get('flight1');
    this.flightId2 = this.aRouter.snapshot.paramMap.get('flight2');
    this.cant = this.aRouter.snapshot.paramMap.get('cant');
  }

  ngOnInit(): void {
    this.getBooking1();
    if (this.flightId2 != '0') {
      this.getBooking2();
    }
    this.sumarSubtotal();

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn, 'this.isLoggedIn');
    if (this.isLoggedIn) {
      const { user } = this.tokenStorageService.getUser();
      this.userLogin = user._id;
    }

  }

  async getBooking1() {
    this._bookingService
      // .getBookingsByFlight('61ae814f3846b88c23e2eebe')
      .getBookingsByFlight(this.flightId1)
      .subscribe({
        next: (data) => {
          this.bookings1 = data;
          console.log(data);
        },
        error: (e: any) => console.error(e),
      });
    this.getFlight1();

    this.getPlaneType1();
  }

  getFlight1() {
    this._flightService
      // .getFlight('61ad18195d7f85df922c4f18')
      .getFlight(this.flightId1)
      .subscribe((data) => {
        this.flighta._id = data._id;
        this.flighta.date = data.date;
        this.flighta.plane = data.plane;
      });
  }

  getPlaneType1() {
    setTimeout(() => {
      this._planeTypeService
        .getPlaneType(this.flighta.plane.planetype._id)

        .subscribe((data) => {
          this.planeType1 = data;
          this.mostrarButacas1(
            this.planeType1.qtyrows,
            this.planeType1.qtyseats
          );
        });
    }, 100);
  }

  mostrarButacas1(filas: number, asientos: number) {
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < asientos; j++) {
        this.butacas.push(i.toString() + j + 'f');
      }
    }
    this.pintarOcupados1(filas, asientos);
  }

  pintarOcupados1(filas: number, asientos: number) {
    for (let booking of this.bookings1) {
      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < asientos; j++) {
          let seats = booking.seat.split(",");
          for(let seat1 of seats){
            let index = this.butacas.findIndex(
              (seat) => seat == seat1 + 'f'
            );
            this.butacas[index] = seat1 + 'v';
          }

        }
      }
    }
  }
  pintarSeleccionado1(asiento: string) {
    let index = this.butacas.findIndex((seat) => seat == asiento);
    if (this.butacas[index].charAt(2) == 'f') {
      if (this.cantSelec1 < Number.parseInt(this.cant!)) {
        this.butacas[index] = this.butacas[index].replace('f', 's');
        this.cantSelec1++;
      }
    } else {
      this.butacas[index] = this.butacas[index].replace('s', 'f');
      this.cantSelec1--;
    }
  }

  guardarReserva1() {
    this.sumarSubtotal();
    let t;
    let asiento:string="";
    for (let butaca of this.butacas) {
      if (butaca.charAt(2) == 's') {
        asiento+=butaca.charAt(0) + butaca.charAt(1) + ",";
      }

      t = butaca.charAt(2);
    }
    asiento = asiento.substring(0, asiento.length - 1);

    const booking: Booking = {
      seat: asiento,
      qtypassengers: Number.parseInt(this.cant!),
      tax: this.impuesto,
      subtotal: this.subtotal,
      total: this.total,
      user: this.userLogin,
      flight: this.flighta._id,
    };
    this._bookingService.saveBooking(booking).subscribe(
      (data) => {
        this.router.navigate(['booking/reservation']);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(t);
    if(this.flightId2 !='0'){
      this.guardarReserva2();
    }

  }

  //2
  async getBooking2() {
    this._bookingService
      // .getBookingsByFlight('61ae814f3846b88c23e2eebe')
      .getBookingsByFlight(this.flightId2)
      .subscribe({
        next: (data) => {
          this.bookings2 = data;
          console.log(data);
        },
        error: (e: any) => console.error(e),
      });
    this.getFlight2();

    this.getPlaneType2();
  }

  getFlight2() {
    this._flightService
      // .getFlight('61ad18195d7f85df922c4f18')
      .getFlight(this.flightId2)
      .subscribe((data) => {
        this.flightb._id = data._id;
        this.flightb.date = data.date;
        this.flightb.plane = data.plane;
      });
  }

  getPlaneType2() {
    setTimeout(() => {
      this._planeTypeService
        .getPlaneType(this.flightb.plane.planetype._id)

        .subscribe((data) => {
          this.planeType2 = data;
          this.mostrarButacas2(
            this.planeType2.qtyrows,
            this.planeType2.qtyseats
          );
        });
    }, 100);
  }

  mostrarButacas2(filas: number, asientos: number) {
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < asientos; j++) {
        this.butacas2.push(i.toString() + j + 'f');
      }
    }
    this.pintarOcupados2(filas, asientos);
  }

  pintarOcupados2(filas: number, asientos: number) {
    for (let booking of this.bookings2) {
      for (let i = 0; i < filas; i++) {
        for (let j = 0; j < asientos; j++) {
          let seats = booking.seat.split(",");
          for(let seat1 of seats){
            let index = this.butacas2.findIndex(
              (seat) => seat == seat1 + 'f'
            );
            this.butacas2[index] = seat1 + 'v';
          }
        }
      }
    }
  }
  pintarSeleccionado2(asiento: string) {
    let index = this.butacas2.findIndex((seat) => seat == asiento);
    if (this.butacas2[index].charAt(2) == 'f') {
      if (this.cantSelec2 < Number.parseInt(this.cant!)) {
        this.butacas2[index] = this.butacas2[index].replace('f', 's');
        this.cantSelec2++;
      }
    } else {
      this.butacas2[index] = this.butacas2[index].replace('s', 'f');
      this.cantSelec2--;
    }
  }

  guardarReserva2() {
    let t;
    let asiento:string="";
    for (let butaca of this.butacas2) {
      if (butaca.charAt(2) == 's') {
        asiento+=butaca.charAt(0) + butaca.charAt(1) + ",";
      }
      t = butaca.charAt(2);
    }
    asiento = asiento.substring(0, asiento.length - 1);
    const booking: Booking = {
      seat: asiento,
      qtypassengers: Number.parseInt(this.cant!),
      tax: this.impuesto,
      subtotal: this.subtotal,
      total: this.total,
      user: this.userLogin,
      flight: this.flightb._id,
    };
    this._bookingService.saveBooking(booking).subscribe(
      (data) => {
        this.router.navigate(['booking/reservation']);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(t);
    this.toastr.success(
      'Se realizó la reserva correctamente',
      'Reserva Realizada'
    );
  }

  sumarSubtotal(){
    setTimeout(() => {
      if(this.flightId2!='0'){
        this.subtotal = (this.flighta.plane.schedule.price + this.flightb.plane.schedule.price) * Number.parseFloat(this.cant!);
      }
      else{
        this.subtotal = this.flighta.plane.schedule.price * Number.parseFloat(this.cant!);
      }
      this.calcularImpuestos();
      this.calcularTotal();
    }, 100);
  }

  calcularImpuestos(){
    this.impuesto = this.subtotal*0.13;
  }

  calcularTotal(){
    this.total= this.subtotal+this.impuesto;
  }
}
