import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTestData(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/${courseID}`, httpOptions);
  }

  deleteTest(courseID: BigInteger): Observable<any> {
    return this.http.delete(AUTH_API + `test/${courseID}`, httpOptions);
  }

  getQuestionsForTest(courseID: number): Observable<any> {
    return this.http.get(AUTH_API + `test/questions/${courseID}`, httpOptions);
  }

  submitScore(courseID: number, score: number): Observable<any> {
    return this.http.put(AUTH_API + 'test/submitScore', {courseID, score}, httpOptions);
  }

  finishedTest(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/didFinishTest/${courseID}`, httpOptions);
  }

  getDataForDownload(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/data/${courseID}`, httpOptions);
  }
}
