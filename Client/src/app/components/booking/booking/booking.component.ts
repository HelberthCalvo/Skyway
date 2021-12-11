import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  asientos:number;
  reserva: boolean = true;
  vuelo: boolean = false;
  compra: boolean = false;
  checkIn: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getAsientos(){
    return this.asientos;
  }
  changeReserva() {
    this.reserva = true;
    this.vuelo = false;
    this.compra = false;
    this.checkIn = false;
  }

  changeVuelo() {
    this.reserva = false;
    this.vuelo = true;
    this.compra = false;
    this.checkIn = false;
  }

  changeCompra() {
    this.reserva = false;
    this.vuelo = false;
    this.compra = true;
    this.checkIn = false;
  }

  changeCheckIn() {
    this.reserva = false;
    this.vuelo = false;
    this.compra = false;
    this.checkIn = true;
  }
}
