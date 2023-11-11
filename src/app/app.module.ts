import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { MatSliderModule } from "@angular/material/slider"
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { CoursePageComponent } from './course-page/course-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CourseManageComponent } from './course-manage/course-manage.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { TestPageComponent } from './test-page/test-page.component';
import { CourseDetailsChangeComponent } from './course-details-change/course-details-change.component';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AdminCourseManageComponent } from './admin-course-manage/admin-course-manage.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { ExcelService } from './_services/excel.service';
import { MatIconModule } from '@angular/material/icon';
import { ChooseLectureComponent } from './choose-lecture/choose-lecture.component';
import { CourseTestDataComponent } from './course-test-data/course-test-data.component';
import { PerStudentDataComponent } from './course-test-data/per-student-data/per-student-data.component';
import { PerLectureDataComponent } from './course-test-data/per-lecture-data/per-lecture-data.component';
import { AllTestDataComponent } from './course-test-data/all-test-data/all-test-data.component';
import { NgChartsModule } from 'ng2-charts';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  
  declarations: [ 
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    CoursePageComponent,
    AdminPageComponent,
    CourseManageComponent,
    EditCourseComponent,
    TestPageComponent,
    CourseDetailsChangeComponent,
    CreateLectureComponent,
    CreateTestComponent,
    AdminCourseManageComponent,
    AdminManageComponent,
    ChooseLectureComponent,
    CourseTestDataComponent,
    PerStudentDataComponent,
    PerLectureDataComponent,
    AllTestDataComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'sr'
    }),
    NgChartsModule
  ],
  providers: [authInterceptorProviders, ExcelService, MatDatepickerModule, MatNativeDateModule, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
