import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plane } from 'src/app/models/plane';
import { PlaneType } from 'src/app/models/planeType';
import { Route } from 'src/app/models/route';
import { Schedule } from 'src/app/models/schedule';
import { PlaneService } from 'src/app/services/plane/plane.service';
import { PlaneTypeService } from 'src/app/services/planeType/plane-type.service';
import { RouteService } from 'src/app/services/route/route.service';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-create-plane',
  templateUrl: './create-plane.component.html',
  styleUrls: ['./create-plane.component.css'],
})
export class CreatePlaneComponent implements OnInit {
  planeForm: FormGroup;
  titulo: string = 'Crear Avión';
  id: string | null;
  routes: Route[];
  schedules: Schedule[];
  planeTypes: PlaneType[];
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _planeServices: PlaneService, 
    private _routeServices: RouteService, private _scheduleService: ScheduleService, private _planeTypeServices: PlaneTypeService, private aRouter: ActivatedRoute) {
    this.planeForm = this.fb.group({
      descrip: ['', Validators.required],
      route: ['618f0197ac68bd52a8014b2f', Validators.required],
      schedule: ['61a04f2307e0c35bdd85bbdd', Validators.required],
      planetype: ['618f0756ac68bd52a8014b3d', Validators.required],

    })
  this.id =this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.getRoute();
    this.getSchedule();
    this.getPlaneType();
  }

  addPlane(){
    console.log(this.planeForm);

    const Plane: Plane = {
      descrip: this.planeForm.get('descrip')?.value,
      route: this.planeForm.get('route')?.value,
      schedule: this.planeForm.get('schedule')?.value,
      planetype: this.planeForm.get('planetype')?.value,
    }

    if(this.id !== null){
      //editar tipo de avión
      this._planeServices.editPlane(this.id, Plane).subscribe(data=>{
        this.toastr.success('El avión fue actualizado con éxito', '¡Avión Actualizado!');
        this.router.navigate(['/list-plane']);
      }, error => {
        console.log(error);
        this.planeForm.reset();
      })
    }else{
      //agregar tipo de avión
      console.log(Plane);
      this._planeServices.savePlane(Plane).subscribe(data=>{
        this.toastr.success('El avión fue registrado con éxito', '¡Avión Registrado!');
        this.router.navigate(['/list-plane']);
      }, error => {
        console.log(error);
        this.planeForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Avión';
      this._planeServices.getPlane(this.id).subscribe(data => {
        this.planeForm.setValue({
          descrip: data.descrip,
          route: data.route._id,
          schedule: data.schedule._id,
          planetype: data.planetype._id,
        })
      })
    }
  }

  getRoute() {
    this._routeServices.getRoutes()
    .subscribe({
      next: (data) => {
        this.routes = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  getSchedule() {
    this._scheduleService.getSchedules()
    .subscribe({
      next: (data) => {
        this.schedules = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  getPlaneType() {
    this._planeTypeServices.getPlaneTypes()
    .subscribe({
      next: (data) => {
        this.planeTypes = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }
}
