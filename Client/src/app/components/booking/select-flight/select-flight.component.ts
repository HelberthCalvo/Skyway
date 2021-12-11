import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight/flight.service';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.css']
})
export class SelectFlightComponent implements OnInit {
  flights: Flight[];
  date1: string | null;
  date2: string | null;
  cant: string | null;
  constructor(
    private _flightService: FlightService,
    private aRouter: ActivatedRoute,
    private router: Router
  )
  {
     this.date1 =this.aRouter.snapshot.paramMap.get('date1');
     this.date2 =this.aRouter.snapshot.paramMap.get('date2');
     this.cant =this.aRouter.snapshot.paramMap.get('cant');
  }

  ngOnInit(): void {
    this.getFlight();
  }


  getFlight() {
    this._flightService.getFlightByDate(this.date1).subscribe({
      next: (data) => {
        this.flights = data;
        console.log(data);
      },
      error: (e: any) => console.error(e),
    });
  }

  vuelo2(id:String){
    if(this.date2!='0'){
      this.router.navigate(['booking/flight2/' + this.date1 + '/' + this.date2 + '/' + id + '/' + this.cant]);
    }
    else{
      this.goPurchase(id);
    }
  }

  goPurchase(id:String){
    this.router.navigate(['booking/purchase-process/' + id + '/' + 0 + '/' + this.cant]);
  }
}
