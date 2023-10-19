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
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'sr'
    })
  ],
  providers: [authInterceptorProviders, ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
