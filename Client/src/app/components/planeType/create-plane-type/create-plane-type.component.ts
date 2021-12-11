import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlaneType } from 'src/app/models/planeType';
import { PlaneTypeService } from 'src/app/services/planeType/plane-type.service';

@Component({
  selector: 'app-create-plane-type',
  templateUrl: './create-plane-type.component.html',
  styleUrls: ['./create-plane-type.component.css']
})
export class CreatePlaneTypeComponent implements OnInit {

  planeTypeForm: FormGroup;
  titulo: string = 'Crear Tipo de Avión';
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private _planeTypeService: PlaneTypeService, private aRouter: ActivatedRoute) { 
    this.planeTypeForm = this.fb.group({
      year: ['', Validators.required],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      qtypassengers: ['', Validators.required],
      qtyrows: ['', Validators.required],
      qtyseats: ['', Validators.required], 
    })
    this.id =this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  addPlaneType(){
    console.log(this.planeTypeForm);

    const PlaneType: PlaneType = {
      year: this.planeTypeForm.get('year')?.value,
      model: this.planeTypeForm.get('model')?.value,
      brand: this.planeTypeForm.get('brand')?.value,
      qtypassengers: this.planeTypeForm.get('qtypassengers')?.value,
      qtyrows: this.planeTypeForm.get('qtyrows')?.value,
      qtyseats: this.planeTypeForm.get('qtyseats')?.value,
    }

    if(this.id !== null){
      //editar tipo de avión
      this._planeTypeService.editPlaneType(this.id, PlaneType).subscribe(data=>{
        this.toastr.success('El tipo de avión fue actualizado con éxito', '¡Tipo de Avión Actualizado!');
        this.router.navigate(['/list-planeType']);
      }, error => {
        console.log(error);
        this.planeTypeForm.reset();
      })
    }else{
      //agregar tipo de avión
      console.log(PlaneType);
      this._planeTypeService.savePlaneType(PlaneType).subscribe(data=>{
        this.toastr.success('El tipo de avión fue registrado con éxito', 'Tipo de Avión Registrada!');
        this.router.navigate(['/list-planeType']);
      }, error => {
        console.log(error);
        this.planeTypeForm.reset();
      })
    }
  }

  esEditar(){
    if(this.id !== null){
      this.titulo = 'Editar Tipo de Avión';
      this._planeTypeService.getPlaneType(this.id).subscribe(data => {
        this.planeTypeForm.setValue({
          year: data.year,
          model: data.model,
          brand: data.brand,
          qtypassengers: data.qtypassengers,
          qtyrows: data.qtyrows,
          qtyseats: data.qtyseats
        })
      })
    }
  }
}
