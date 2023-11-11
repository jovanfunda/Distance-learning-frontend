import { Component } from '@angular/core';
import { TestDataService } from '../_services/test-data.service';
import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';
import { CourseTestDataService } from './course-test-data.service';

@Component({
  selector: 'app-course-test-data',
  templateUrl: './course-test-data.component.html',
  styleUrls: ['./course-test-data.component.css']
})
export class CourseTestDataComponent {

  showComponent = "";

  course: Course;

  constructor(private courseTestDataService: CourseTestDataService, private testDataService: TestDataService, private courseService: CourseService) {
    this.course = history.state.course;

    this.testDataService.getTestScores(this.course.id).subscribe({
      next: (data) => {
        this.courseTestDataService.data = data;
        for(let i = 0; i < data.lectures.length; i++) {
          this.courseTestDataService.students.add(data.lectures[i].studentEmail);
          this.courseTestDataService.lectures.add(data.lectures[i].lectureTitle);
      }
      }
    })
  }
}
