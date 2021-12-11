import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
})
export class CreateScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  titulo: string = 'Crear Horario';
  id: string | null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _scheduleService: ScheduleService,
    private aRouter: ActivatedRoute
  ) {
    this.scheduleForm = this.fb.group({
      day: ['', Validators.required],
      arrivedhour: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  addSchedule() {
    console.log(this.scheduleForm);

    const Schedule: Schedule = {
      day: this.scheduleForm.get('day')?.value,
      arrivedhour: this.scheduleForm.get('arrivedhour')?.value,
      price: this.scheduleForm.get('price')?.value,
    };

    if (this.id !== null) {
      //editar ruta
      this._scheduleService.editSchedule(this.id, Schedule).subscribe(
        (data) => {
          this.toastr.success(
            'El horario fue actualizado con éxito',
            '¡Horario Actualizado!'
          );
          this.router.navigate(['/list-schedule']);
        },
        (error) => {
          console.log(error);
          this.scheduleForm.reset();
        }
      );
    } else {
      //agregar ruta
      console.log(Schedule);
      this._scheduleService.saveSchedule(Schedule).subscribe(
        (data) => {
          this.toastr.success(
            'La ruta fue registrada con éxito',
            '¡Ruta Registrada!'
          );
          this.router.navigate(['/list-schedule']);
        },
        (error) => {
          console.log(error);
          this.scheduleForm.reset();
        }
      );
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Ruta';
      this._scheduleService.getSchedule(this.id).subscribe((data) => {
        this.scheduleForm.setValue({
          day: data.day,
          arrivedhour: data.arrivedhour,
          price: data.price,
        });
      });
    }
  }
}
