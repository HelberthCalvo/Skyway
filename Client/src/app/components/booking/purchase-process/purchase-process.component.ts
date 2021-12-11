import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight/flight.service';

@Component({
  selector: 'app-purchase-process',
  templateUrl: './purchase-process.component.html',
  styleUrls: ['./purchase-process.component.css']
})
export class PurchaseProcessComponent implements OnInit {
  flighta: Flight = new Flight();
  flightb: Flight = new Flight();
  flightId1: string | null;
  flightId2: string | null;
  cant: string | null;
  subtotal: number=0;
  impuesto: number=0;
  total: number=0;
  constructor(private router: Router, private aRouter: ActivatedRoute, private _flightService: FlightService,) {
    this.flightId1 =this.aRouter.snapshot.paramMap.get('flight1');
    this.flightId2 =this.aRouter.snapshot.paramMap.get('flight2');
    this.cant =this.aRouter.snapshot.paramMap.get('cant');
  }

  ngOnInit(): void {
    this.getFlight1();
    if (this.flightId2 != '0') {
      this.getFlight2();
    }
    this.sumarSubtotal();
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

  goCheckIn(){
    this.router.navigate(['booking/check-in/' + this.flightId1 + '/' + this.flightId2 + '/' + this.cant]);
  }

  cancelar(){
    this.router.navigate(['booking/reservation']);
  }
}
