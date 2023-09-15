import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { AdminGuard } from './admin-page/admin.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CourseManageComponent } from './course-manage/course-manage.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'course/:id', component: CoursePageComponent },
  { path: 'manageCourses', component: CourseManageComponent},
  { path: 'editCourse/:id', component: EditCourseComponent},
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
