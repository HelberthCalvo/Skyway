import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/models/flight';
import { FlightService } from 'src/app/services/flight/flight.service';


@Component({
  selector: 'app-list-flight',
  templateUrl: './list-flight.component.html',
  styleUrls: ['./list-flight.component.css'],
})
export class ListFlightComponent implements OnInit {
  flights: Flight[];

  constructor(
    private _flightService: FlightService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getFlight();
  }

  getFlight() {
    this._flightService.getFlights().subscribe({
      next: (data) => {
        this.flights = data;
        console.log(data);
      },
      error: (e: any) => console.error(e),
    });
  }

  deleteFlight(id: any) {
    this._flightService.deleteFlight(id).subscribe(
      (data) => {
        this.toastr.error(
          'El vuelo fue eliminado con éxito',
          'Vuelo Eliminado'
        );
        this.getFlight();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
