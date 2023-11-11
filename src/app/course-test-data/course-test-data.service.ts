import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseTestDataService {

  data: any;
  students = new Set<string>;
  lectures = new Set<string>;

}
