import { Component } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';
import { LectureDTO } from '../_models/lectureDTO';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {

  course: Course;
  lectures = [] as LectureDTO[];

  constructor(private courseService: CourseService, private sanitizer: DomSanitizer, private router: Router) {
    this.course = history.state.course;

    this.courseService.getLectures(this.course.id).subscribe({
      next: (data) => {
          this.lectures = data;
          for(let i = 0; i < this.lectures.length; i++) {
            this.lectures[i].safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.lectures[i].videoURL);
            this.lectures[i].testStartDate = new Date(this.lectures[i].testStartDate);
          }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  startTest(lectureID: BigInteger) {
    this.router.navigate(['test', lectureID]);
  }

  testActive(lecture: LectureDTO): boolean {
    if(new Date().getTime() > lecture.testStartDate.getTime()) {
      const now = new Date();
      now.setHours(now.getHours() - 1);
      if(now.getTime() < lecture.testStartDate.getTime()) {
        return true;
      }
    }
    return false;
  }
}
