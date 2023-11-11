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
export class TestDataService {

  constructor(private http: HttpClient) { }

  getTestData(testID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/${testID}`, httpOptions);
  }

  getTestScores(courseID: BigInteger): Observable<any> {
    return this.http.get(AUTH_API + `test/scores/${courseID}`, httpOptions);
  }

  getQuestionsForTest(lectureID: number): Observable<any> {
    return this.http.get(AUTH_API + `test/questions/${lectureID}`, httpOptions);
  }

  submitScore(lectureID: number, score: number): Observable<any> {
    return this.http.put(AUTH_API + 'test/submitScore', {lectureID, score}, httpOptions);
  }
}
