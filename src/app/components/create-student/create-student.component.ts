import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmacionComponent } from "../dialog-confirmacion/dialog-confirmacion.component";
import { Career } from 'src/app/models/career.model';
import { CareerService } from 'src/app/services/career.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  createStudent: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo: string = 'Agregar Estudiante';
  careers: Career[] = [];


  constructor(private fb: FormBuilder,
    private _studentService: StudentService,
    private _careerService: CareerService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    public dialogo: MatDialog) {
    this.createStudent = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(20)]],
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      edad: ['', [Validators.required, Validators.pattern(/^[0-9][0-9]?$|^100$/)]],
      carrera: ['', [Validators.required]]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }


  ngOnInit(): void {
    this.esEditar();
    this.getCareers();
  }

  getCareers() {
    this._careerService.getCareers().subscribe(data => {
      this.careers = data.sort((a,b) => a.description.localeCompare(b.description));
    });
  }

  addEditStudent() {
    this.submitted = true;

    if (this.createStudent.invalid) {
      return;
    }

    console.log(this.id)
    if (this.id === null) {
      this.addStudent();
    } else {
      this.editStudent(this.id);
    }

  }

  addStudent() {
    this.dialogo
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de crear el estudiante?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        const estudiante: any = {
          firstName: this.createStudent.value.nombre,
          lastName: this.createStudent.value.apellido,
          username: this.createStudent.value.usuario,
          age: this.createStudent.value.edad,
          career: this.createStudent.value.carrera
        }
        this.loading = true;
        this._studentService.addStudent(estudiante).then(() => {
          this.toastr.success('El estudiante fue registrado con exito!', 'Estudiante Registrado', {
            positionClass: 'toast-bottom-right'
          });
          this.loading = false;
          this.router.navigate(['/list-students']);
        }).catch(error => {
          console.log(error);
          this.loading = false;
        })
      }
    });

  }

  editStudent(id: string) {

    this.dialogo
    .open(DialogConfirmacionComponent, {
      data: `¿Está seguro de guradar cambios?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        const estudiante: Student = {
          id : id,
          firstName: this.createStudent.value.nombre,
          lastName: this.createStudent.value.apellido,
          username: this.createStudent.value.usuario,
          age: this.createStudent.value.edad,  
          career: this.createStudent.value.carrera
        }
    
        this.loading = true;
    
        this._studentService.updateStudent(id, estudiante).subscribe(() => {
          this.loading = false;
          this.toastr.info('El estudiante fue modificado con exito', 'Estudiante modificado', {
            positionClass: 'toast-bottom-right'
          })
          this.router.navigate(['/list-students']);
        })
      }
    });

  }


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Estudiante';
      this.loading = true;
      console.log(this.id)
      this._studentService.getStudent(this.id).subscribe(data => {
        this.loading = false;
        this.createStudent.setValue({
          nombre: data.firstName,
          apellido: data.lastName,
          usuario: data.username,
          edad: data.age,
          carrera: data.career,
        })
      })
    }
  }

  resetControlNombre(){
    this.createStudent.controls.nombre.setValue("");
    this.createStudent.controls.nombre.invalid;
  }

  resetControlApellido(){
    this.createStudent.controls.apellido.setValue("");
    this.createStudent.controls.apellido.invalid;
  }

  resetControlUsuario(){
    this.createStudent.controls.usuario.setValue("");
    this.createStudent.controls.usuario.invalid;
  }


}
