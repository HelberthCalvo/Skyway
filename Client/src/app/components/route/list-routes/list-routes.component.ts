import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.css'],
})
export class ListRoutesComponent implements OnInit {
  routes: Route[];

  constructor(private _routeService: RouteService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    this._routeService.getRoutes()
    .subscribe({
      next: (data) => {
        this.routes = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  deleteRoute(id:any){
    this._routeService.deleteRoute(id).subscribe(data => {
      this.toastr.error('La ruta fue eliminada con éxito', 'Ruta Eliminada');
      this.getRoutes();
    }, error => {
      console.log(error);
    })
  }
}
