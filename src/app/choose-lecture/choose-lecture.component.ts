import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { DomSanitizer } from '@angular/platform-browser';
import { CourseService } from '../_services/course.service';
import { LectureDTO } from '../_models/lectureDTO';
import { Router } from '@angular/router';
import { TestService } from '../_services/test.service';

@Component({
  selector: 'app-choose-lecture',
  templateUrl: './choose-lecture.component.html',
  styleUrls: ['./choose-lecture.component.css']
})
export class ChooseLectureComponent {

  course: Course;
  lectures = [] as LectureDTO[];

  constructor(private courseService: CourseService, private testService: TestService, private sanitizer: DomSanitizer, private router: Router) {
    this.course = history.state.course;
    this.courseService.getLectures(this.course.id).subscribe({
      next: (data) => {
        this.lectures = data;
        for(let i = 0; i < this.lectures.length; i++) {
          this.lectures[i].safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.lectures[i].videoURL);
        }
      }
    })
  }

  createTest(lecture: LectureDTO) {
    this.testService.lectureHasTest(lecture.id).subscribe({
      next: (hasTest) => {
        if(hasTest) {
          let createNewTest = window.confirm("Da li zelite da napravite novi test za izabranu lekciju?");
          if(!createNewTest) {
            return;
          }
          this.testService.deleteTest(lecture.id).subscribe();
        }
        this.router.navigate(['/createTest', lecture.id], {state: {lecture: lecture}});
      }
    })
  }
}
