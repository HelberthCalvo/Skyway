import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight/flight.service';

@Component({
  selector: 'app-flight2',
  templateUrl: './flight2.component.html',
  styleUrls: ['./flight2.component.css']
})
export class Flight2Component implements OnInit {

  flights: Flight[];
  date2: string | null;
  flightId1: string | null;
  cant: string | null;
  constructor(
    private _flightService: FlightService,
    private aRouter: ActivatedRoute,
    private router: Router
  )
  {
     this.flightId1 =this.aRouter.snapshot.paramMap.get('flight1');
     this.date2 =this.aRouter.snapshot.paramMap.get('date2');
     this.cant =this.aRouter.snapshot.paramMap.get('cant');
  }

  ngOnInit(): void {
    this.getFlight();
  }


  getFlight() {
    this._flightService.getFlightByDate(this.date2).subscribe({
      next: (data) => {
        this.flights = data;
        console.log(data);
      },
      error: (e: any) => console.error(e),
    });
  }

  goPurchase(id:String){
    this.router.navigate(['booking/purchase-process/' + this.flightId1 + '/' + id + '/' + this.cant]);
  }
}
