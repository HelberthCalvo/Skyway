import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.css']
})
export class ListScheduleComponent implements OnInit {

  schedules: Schedule[];
  constructor(private _scheduleService: ScheduleService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSchedules();
  }

  getSchedules() {
    this._scheduleService.getSchedules()
    .subscribe({
      next: (data) => {
        this.schedules = data;
        console.log(data);
      },
      error: (e: any) => console.error(e)
    });
  }

  deleteSchedule(id:any){
    this._scheduleService.deleteSchedule(id).subscribe(data => {
      this.toastr.error('El horario fue eliminado con éxito', 'Horario Eliminado');
      this.getSchedules();
    }, error => {
      console.log(error);
    })
  }
}
