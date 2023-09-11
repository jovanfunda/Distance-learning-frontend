import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../_models/course';

const AUTH_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [];

  constructor(private http: HttpClient) { }

  courses_home(): Observable<any> {
    return this.http.get(AUTH_API + 'api/course', httpOptions);
  }

  setCourses(data: any) {
    this.courses = data;
  }

  getCourses() {
    return this.courses;
  }
}
