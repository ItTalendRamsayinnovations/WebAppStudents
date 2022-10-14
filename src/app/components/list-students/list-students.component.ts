import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { DialogConfirmacionComponent } from "../dialog-confirmacion/dialog-confirmacion.component";
import { Student } from '../../models/student.model';


@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  students: Student[] = [];

  constructor(private _studentService: StudentService, 
    private toastr: ToastrService,
    public dialogo: MatDialog) { }

  ngOnInit(): void {
    this.getStudents();

  }

  getStudents() {
    this._studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }


  deleteStudent(id: string) {
    this.dialogo
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de eliminar el registro?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this._studentService.deleteStudent(id).then(() => {
          console.log('Estudiante eliminado con exito');
          this.toastr.error('El estudiante fue eliminado exitosamente', 'Registro eliminado!', {
            positionClass: 'toast-bottom-right'
          });
          this.getStudents();
        }).catch(error => {
          console.log(error);
        })
      }
    });
  }
}
