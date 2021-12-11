import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/models/flight';
import { Plane } from 'src/app/models/plane';
import { FlightService } from 'src/app/services/flight/flight.service';
import { PlaneService } from 'src/app/services/plane/plane.service';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  flightForm: FormGroup;
  titulo: string = 'Crear Vuelo';
  id: string | null;
  planes: Plane[];
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _planeServices: PlaneService, private _flightService: FlightService, private aRouter: ActivatedRoute) {
    this.flightForm = this.fb.group({
      date: ['', Validators.required],
      plane: ['61a0509c07e0c35bdd85bc1d', Validators.required]
    })
  this.id =this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.getPlane();
  }

  addFlight(){
    console.log(this.flightForm);

    const Flight: Flight = {
      date: this.flightForm.get('date')?.value,
      plane: this.flightForm.get('plane')?.value,
    }

    if(this.id !== null){
      //editar tipo de avión
      this._flightService.editFlight(this.id, Flight).subscribe(data=>{
        this.toastr.success('El vuelo fue actualizado con éxito', '¡Vuelo Actualizado!');
        this.router.navigate(['/list-flight']);
      }, error => {
        console.log(error);
        this.flightForm.reset();
      })
    }else{
      //agregar tipo de avión
      console.log(Flight);
      this._flightService.saveFlight(Flight).subscribe(data=>{
        this.toastr.success('El vuelo fue registrado con éxito', '¡Vuelo Registrado!');
        this.router.navigate(['/list-flight']);
      }, error => {
        console.log(error);
        this.flightForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Vuelo';
      this._flightService.getFlight(this.id).subscribe(data => {
        this.flightForm.setValue({
          date: data.date,
          plane: data.plane._id
        })
      })
    }
  }
  getPlane(){
    this._planeServices.getPlanes()
    .subscribe({
      next: (data) => {
        this.planes = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }
}
