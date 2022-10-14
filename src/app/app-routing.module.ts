import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStudentsComponent } from './components/list-students/list-students.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-students', pathMatch: 'full' },
  { path: 'list-students', component: ListStudentsComponent },
  { path: 'create-student', component: CreateStudentComponent },
  { path: 'editStudent/:id', component: CreateStudentComponent },
  { path: '**', redirectTo: 'list-students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
