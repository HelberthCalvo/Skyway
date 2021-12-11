import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule, // modulo de animaciones requerido
    ToastrModule.forRoot(), // ToastrModule agregado
  ],
  exports: [FooterComponent],
})
export class CoreModule {}
