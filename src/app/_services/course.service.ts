import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../_models/course';

const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(AUTH_API + 'course', httpOptions);
  }

  getMyCourses(): Observable<any> {
    return this.http.get(AUTH_API + "course/myCourses", httpOptions)
  }

  getCourse(id: number): Observable<any> {
    return this.http.get<any>(AUTH_API + `course/${id}`, httpOptions);
  }

  enrollCourse(course: Course): Observable<any> {
    return this.http.put(AUTH_API + 'course/startEnrollment', course.name, httpOptions);
  }

  getLectures(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + "lecture/" + courseID, httpOptions);
  }
}
