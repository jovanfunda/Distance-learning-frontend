import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getEnrolledStudents(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `course/getEnrolledStudents/${courseID}`, httpOptions);
  }

  getMyOwnCourses(): Observable<any> {
    return this.http.get(AUTH_API + "course/myCourses", httpOptions);
  }

  getCourse(id: number): Observable<any> {
    return this.http.get<any>(AUTH_API + `course/${id}`, httpOptions);
  }

  enrollCourse(courseID: BigInteger): Observable<any> {
    return this.http.put(AUTH_API + 'course/startEnrollment', courseID, httpOptions);
  }

  getLectures(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `lecture/${courseID}`, httpOptions);
  }

  createCourse(courseName: string): Observable<any> {
    return this.http.post(AUTH_API + "course/create", courseName, httpOptions)
  }

  createLecture(lecture: LectureDTO, courseID: BigInteger): Observable<any> {
    return this.http.post(AUTH_API + "lecture/create", { courseID: courseID, title: lecture.title, videoURL: lecture.videoURL, data: lecture.data }, httpOptions)
  }

  createTest(lectureID: BigInteger, questions: Question[], startDate: Date, time: string): Observable<any> {
    return this.http.post(AUTH_API + "test/create", {lectureID, questions, startDate, time}, httpOptions)
  }

  deleteCourse(courseID: BigInteger): Observable<any> {
    return this.http.delete(AUTH_API + `course/delete/${courseID}`, httpOptions)
  }

  assignProfessor(email: string, courseID: BigInteger): Observable<any> {
    return this.http.put(AUTH_API + "course/changeOwnership", {newOwnerEmail:email, courseID:courseID}, httpOptions)
  }

  changeCourseDescription(courseID: BigInteger, courseDescription: string, coursePictureURL: string): Observable<any> {
    return this.http.put(AUTH_API + "course/changeData", {courseID, courseDescription, coursePictureURL}, httpOptions);
  }

  getAllScores(email: string, courseID: BigInteger): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('courseID', parseInt(courseID.toString()));

    return this.http.get(AUTH_API + `course/getAllScores`, { params: params, headers: httpOptions.headers });
  }
}
