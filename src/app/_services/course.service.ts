import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../_models/course';
import { LectureDTO } from '../_models/lectureDTO';
import { Question } from '../_models/question';

const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  myOwnCourses = [] as Course[];
  enrolledCourses = [] as Course[];
  notEnrolledCourses = [] as Course[];
  allCourses = [] as Course[];
  
  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http.get(AUTH_API + 'course', httpOptions);
  }

  getEnrolledCourses(): Observable<any> {
    return this.http.get(AUTH_API + "course/enrolledCourses", httpOptions)
  }

  getMyOwnCourses(): Observable<any> {
    return this.http.get(AUTH_API + "course/myOwnCourses", httpOptions);
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

  createCourse(courseName: string): Observable<any> {
    return this.http.post(AUTH_API + "course/create", courseName, httpOptions)
  }

  createLecture(lecture: LectureDTO, course: string): Observable<any> {
    return this.http.post(AUTH_API + "lecture/create", { course: course, title: lecture.title, videoURL: lecture.videoURL, data: lecture.data }, httpOptions)
  }

  createTest(courseID: BigInteger, questions: Question[]): Observable<any> {
    return this.http.post(AUTH_API + "test/create", {courseID, questions}, httpOptions)
  }

  deleteCourse(courseID: BigInteger): Observable<any> {
    console.log(AUTH_API + "course/delete/" + courseID)
    return this.http.delete(AUTH_API + "course/delete/" + courseID, httpOptions)
  }

  assignProfessor(email: string, courseName: string): Observable<any> {
    return this.http.put(AUTH_API + "course/changeOwnership", {newOwnerEmail:email, courseName:courseName}, httpOptions)
  }

  changeCourseDescription(courseID: BigInteger, courseDescription: string, coursePictureURL: string): Observable<any> {
    return this.http.put(AUTH_API + "course/changeData", {courseID, courseDescription, coursePictureURL}, httpOptions);
  }
}
