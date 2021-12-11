import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking/booking.component';
import { CheckInComponent } from './components/booking/check-in/check-in.component';
import { Flight2Component } from './components/booking/flight2/flight2.component';
import { PurchaseProcessComponent } from './components/booking/purchase-process/purchase-process.component';
import { ReservationComponent } from './components/booking/reservation/reservation.component';
import { SelectFlightComponent } from './components/booking/select-flight/select-flight.component';
import { CreateFlightComponent } from './components/flight/create-flight/create-flight.component';
import { ListFlightComponent } from './components/flight/list-flight/list-flight.component';
import { CreatePlaneComponent } from './components/plane/create-plane/create-plane.component';
import { ListPlaneComponent } from './components/plane/list-plane/list-plane.component';
import { CreatePlaneTypeComponent } from './components/planeType/create-plane-type/create-plane-type.component';
import { ListPlaneTypeComponent } from './components/planeType/list-plane-type/list-plane-type.component';
import { CreateRouteComponent } from './components/route/create-route/create-route.component';
import { ListRoutesComponent } from './components/route/list-routes/list-routes.component';
import { CreateScheduleComponent } from './components/schedule/create-schedule/create-schedule.component';
import { ListScheduleComponent } from './components/schedule/list-schedule/list-schedule.component';
import { AccountComponent } from './components/user/account/account.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { PurchasesComponent } from './components/user/purchases/purchases.component';
import { SigninUserComponent } from './components/user/signin-user/signin-user.component';
import { SignupUserComponent } from './components/user/signup-user/signup-user.component';
import { AboutInfoComponent } from './components/about/about-info/about-info.component';
import { HomeInfoComponent } from './components/home/home-info/home-info.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  //Share
  { path: '', component: HomeInfoComponent },
  { path: 'about-info', component: AboutInfoComponent },

  //Rutas
  { path: 'list-route', component: ListRoutesComponent },
  { path: 'create-route', component: CreateRouteComponent },
  { path: 'edit-route/:id', component: CreateRouteComponent },

  //Horarios
  { path: 'list-schedule', component: ListScheduleComponent },
  { path: 'create-schedule', component: CreateScheduleComponent },
  { path: 'edit-schedule/:id', component: CreateScheduleComponent },

  //Tipos de aviones
  { path: 'list-planeType', component: ListPlaneTypeComponent },
  { path: 'create-planeType', component: CreatePlaneTypeComponent },
  { path: 'edit-planeType/:id', component: CreatePlaneTypeComponent },

  //Aviones
  { path: 'list-plane', component: ListPlaneComponent },
  { path: 'create-plane', component: CreatePlaneComponent },
  { path: 'edit-plane/:id', component: CreatePlaneComponent },

  //Usuarios
  { path: 'list-user', component: ListUserComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'edit-user/:id', component: CreateUserComponent },
  { path: 'account/:id', component: AccountComponent },
  { path: 'purchases/:id', component: PurchasesComponent },
  { path: 'signin-user', component: SigninUserComponent },
  { path: 'signup-user', component: SignupUserComponent },

  //Vuelos
  { path: 'list-flight', component: ListFlightComponent },
  { path: 'create-flight', component: CreateFlightComponent },
  { path: 'edit-flight/:id', component: CreateFlightComponent },

  //Booking
  { path: 'booking', component: BookingComponent, children: [
    {path: 'reservation', component: ReservationComponent},
    {path: 'select-flight/:date1/:date2/:cant', component: SelectFlightComponent},
    {path: 'flight2/:date1/:date2/:flight1/:cant', component: Flight2Component},
    {path: 'purchase-process/:flight1/:flight2/:cant', component: PurchaseProcessComponent},
    {path: 'check-in/:flight1/:flight2/:cant', component: CheckInComponent},
  ] },

  //Reportes
  { path: 'report', component: ReportComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
