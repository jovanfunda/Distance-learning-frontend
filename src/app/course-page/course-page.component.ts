import { Component } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';
import { LectureDTO } from '../_models/lectureDTO';
import { DomSanitizer } from '@angular/platform-browser';
import { TestService } from '../_services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {

  course: Course;
  lectures = [] as LectureDTO[];
  courseHasTest = false;
  finishedTest = false;
  isTestActive = false;
  startDate!: Date;
  score = 0;

  constructor(private courseService: CourseService, private testService: TestService, private sanitizer: DomSanitizer, private router: Router) {
    this.course = history.state.course;

    this.courseService.getLectures(this.course.id).subscribe({
      next: (data) => {
          this.lectures = data;
          for(let i = 0; i < this.lectures.length; i++) {
            this.lectures[i].safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.lectures[i].videoURL);
          }
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.testService.getTestData(this.course.id).subscribe({
      next: (data) => {
        console.log(data);
          this.courseHasTest = data.doesTestExist;
          this.startDate = new Date(data.startDate);
          this.testActive();
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.testService.finishedTest(this.course.id).subscribe({
      next: (data) => {
        this.finishedTest = data.finishedTest;
        this.score = data.score;
      }
    })
  }

  startTest() {
    this.router.navigate(['test', this.course.id]);
  }

  testActive() {
    if(new Date().getTime() > this.startDate.getTime()) {
      const now = new Date();
      now.setHours(now.getHours() - 1);
      if(now.getTime() < this.startDate.getTime()) {
        this.isTestActive = true;
        return;
      }
    }
  }
}
