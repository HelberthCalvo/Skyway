import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  tipo:number=0;
  reserveForm: FormGroup;
  routes: Route[];


  constructor(private fb: FormBuilder, private _routeServices: RouteService, private router: Router) {
    this.reserveForm = this.fb.group({
      tipoVuelo:[0, Validators.required],
      date: ['', Validators.required],
      date2: [''],
      pasajeros: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRoute();
  }

  tipoReserva(evento:any){
    this.tipo = evento.target.value;
  }

  getRoute() {
    this._routeServices.getRoutes().subscribe({
      next: (data) => {
        this.routes = data;
        console.log(data);
      },
      error: (e: any) => console.error(e),
    });
  }

  buscarVuelos() {
    if(this.reserveForm.get('date2')?.value == ''){
      this.router.navigate(['booking/select-flight/' + this.reserveForm.get('date')?.value + '/' + 0 + '/' + this.reserveForm.get('pasajeros')?.value]);
    }
    else{
      this.router.navigate(['booking/select-flight/' + this.reserveForm.get('date')?.value + '/' + this.reserveForm.get('date2')?.value + '/' + this.reserveForm.get('pasajeros')?.value]);
    }
  }


}
