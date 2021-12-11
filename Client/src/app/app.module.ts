import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { CreateRouteComponent } from './components/route/create-route/create-route.component';
import { ListRoutesComponent } from './components/route/list-routes/list-routes.component';
import { ListScheduleComponent } from './components/schedule/list-schedule/list-schedule.component';
import { CreateScheduleComponent } from './components/schedule/create-schedule/create-schedule.component';
import { CreatePlaneTypeComponent } from './components/planeType/create-plane-type/create-plane-type.component';
import { ListPlaneTypeComponent } from './components/planeType/list-plane-type/list-plane-type.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { CreatePlaneComponent } from './components/plane/create-plane/create-plane.component';
import { ListPlaneComponent } from './components/plane/list-plane/list-plane.component';
import { ListFlightComponent } from './components/flight/list-flight/list-flight.component';
import { CreateFlightComponent } from './components/flight/create-flight/create-flight.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { SelectFlightComponent } from './components/booking/select-flight/select-flight.component';
import { PurchaseProcessComponent } from './components/booking/purchase-process/purchase-process.component';
import { CheckInComponent } from './components/booking/check-in/check-in.component';
import { ReservationComponent } from './components/booking/reservation/reservation.component';
import { SigninUserComponent } from './components/user/signin-user/signin-user.component';
import { Flight2Component } from './components/booking/flight2/flight2.component';
import { SignupUserComponent } from './components/user/signup-user/signup-user.component';
import { AboutInfoComponent } from './components/about/about-info/about-info.component';
import { AccountComponent } from './components/user/account/account.component';
import { HomeInfoComponent } from './components/home/home-info/home-info.component';
import { CoreModule } from './components/core/core.module';
import { PurchasesComponent } from './components/user/purchases/purchases.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    AppComponent,

    CreateRouteComponent,
    ListRoutesComponent,
    ListScheduleComponent,
    CreateScheduleComponent,
    CreatePlaneTypeComponent,
    ListPlaneTypeComponent,
    CreateUserComponent,
    ListUserComponent,
    CreatePlaneComponent,
    ListPlaneComponent,
    ListFlightComponent,
    CreateFlightComponent,
    BookingComponent,
    SelectFlightComponent,
    PurchaseProcessComponent,
    CheckInComponent,
    ReservationComponent,
    SigninUserComponent,
    Flight2Component,
    SignupUserComponent,
    AccountComponent,
    HomeInfoComponent,
    AccountComponent,
    PurchasesComponent,
    AboutInfoComponent,
    AccountComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
