import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PlaneType } from 'src/app/models/planeType';
import { PlaneTypeService } from 'src/app/services/planeType/plane-type.service';

@Component({
  selector: 'app-list-plane-type',
  templateUrl: './list-plane-type.component.html',
  styleUrls: ['./list-plane-type.component.css']
})
export class ListPlaneTypeComponent implements OnInit {
  planeTypes: PlaneType[];

  constructor(private _planeTypeService: PlaneTypeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPlaneTypes();
  }

  getPlaneTypes() {
    this._planeTypeService.getPlaneTypes()
    .subscribe({
      next: (data) => {
        this.planeTypes = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  deletePlaneType(id:any){
    this._planeTypeService.deletePlaneType(id).subscribe(data => {
      this.toastr.error('El tipo de avión fue eliminado con éxito', 'Tipo de Avión Eliminado');
      this.getPlaneTypes();
    }, error => {
      console.log(error);
    })
  }

}
