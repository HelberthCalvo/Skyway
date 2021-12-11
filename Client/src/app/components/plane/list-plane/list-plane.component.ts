import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Plane } from 'src/app/models/plane';
import { Route } from 'src/app/models/route';
import { PlaneService } from 'src/app/services/plane/plane.service';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-list-plane',
  templateUrl: './list-plane.component.html',
  styleUrls: ['./list-plane.component.css'],
})
export class ListPlaneComponent implements OnInit {
  planes: Plane[] = [];
  constructor(
    private _planeService: PlaneService,
    private _routeService: RouteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPlane();
  }

  getPlane() {
    this._planeService.getPlanes()
    .subscribe({
      next: (data) => {
        this.planes = data;
        console.log(data);
      },
      error: (e: any) => console.error(e),
    });
  }
  
  deletePlane(id: any): void {
    this._planeService.deletePlane(id).subscribe(
      (data) => {
        this.toastr.error(
          'El avión fue eliminado con éxito',
          'Avión Eliminado'
        );
        this.getPlane();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
