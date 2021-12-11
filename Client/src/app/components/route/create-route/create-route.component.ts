import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {

  routeForm: FormGroup;
  titulo: string = 'Crear Ruta';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _routeService: RouteService, private aRouter: ActivatedRoute) {
    this.routeForm = this.fb.group({
      descrip: ['', Validators.required],
      duration: ['', Validators.required]
    })
    this.id =this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  addRoute(){
    console.log(this.routeForm);

    const Route: Route = {
      descrip: this.routeForm.get('descrip')?.value,
      duration: this.routeForm.get('duration')?.value
    }

    if(this.id !== null){
      //editar ruta
      this._routeService.editRoute(this.id, Route).subscribe(data=>{
        this.toastr.success('La ruta fue actualizada con éxito', '¡Ruta Actualizada!');
        this.router.navigate(['/list-route']);
      }, error => {
        console.log(error);
        this.routeForm.reset();
      })
    }else{
      //agregar ruta
      console.log(Route);
      this._routeService.saveRoute(Route).subscribe(data=>{
        this.toastr.success('La ruta fue registrada con éxito', '¡Ruta Registrada!');
        this.router.navigate(['/list-route']);
      }, error => {
        console.log(error);
        this.routeForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Ruta';
      this._routeService.getRoute(this.id).subscribe(data => {
        this.routeForm.setValue({
          descrip: data.descrip,
          duration: data.duration
        })
      })
    }
  }
}
