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

  getTestData(testID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/${testID}`, httpOptions);
  }

  getQuestionsForTest(lectureID: number): Observable<any> {
    return this.http.get(AUTH_API + `test/questions/${lectureID}`, httpOptions);
  }

  submitScore(lectureID: number, score: number): Observable<any> {
    return this.http.put(AUTH_API + 'test/submitScore', {lectureID, score}, httpOptions);
  }

  finishedTest(lectureID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/didFinishTest/${lectureID}`, httpOptions);
  }

  getDataForDownload(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/data/${courseID}`, httpOptions);
  }

  lectureHasTest(lectureID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/hasTest/${lectureID}`, httpOptions);
  }

  deleteTest(lectureID: BigInteger): Observable<any> {
    return this.http.delete(AUTH_API + `test/${lectureID}`, httpOptions)
  }
}
