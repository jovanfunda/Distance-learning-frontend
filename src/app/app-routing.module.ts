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
import { TestPageComponent } from './test-page/test-page.component';
import { CourseDetailsChangeComponent } from './course-details-change/course-details-change.component';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AdminCourseManageComponent } from './admin-course-manage/admin-course-manage.component'
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { ChooseLectureComponent } from './choose-lecture/choose-lecture.component';
import { CourseTestDataComponent } from './course-test-data/course-test-data.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'course/:id', component: CoursePageComponent },
  { path: 'manageCourses', component: CourseManageComponent },
  { path: 'editCourse/:id', component: EditCourseComponent },
  { path: 'test/:lectureID', component: TestPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: 'details/:courseID', component: CourseDetailsChangeComponent },
  { path: 'createLecture/:courseID', component: CreateLectureComponent },
  { path: 'createTest/:lectureID', component: CreateTestComponent },
  { path: 'adminCourseManage', component: AdminCourseManageComponent },
  { path: 'adminManager', component: AdminManageComponent },
  { path: 'chooseLecture/:courseID', component: ChooseLectureComponent },
  { path: 'courseTestData/:courseID', component: CourseTestDataComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
