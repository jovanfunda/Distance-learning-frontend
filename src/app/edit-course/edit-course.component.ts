import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { LectureDTO } from '../_models/lectureDTO'
import { CourseService } from '../_services/course.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {

  course: Course;
  lectures = [] as LectureDTO[];
  newLecture: LectureDTO = {
    title: '',
    videoUrl: '',
    data: '',
    safeURL: ''
  };
  questions = ['1', '2', '3', '4', '5']
  currentQuestionIndex = 0;

  constructor(private courseService: CourseService, private sanitizer: DomSanitizer) {
    this.course = history.state.course;

    this.courseService.getLectures(this.course.id).subscribe({
      next: (data) => {
        this.lectures = data;
        for(let i = 0; i < this.lectures.length; i++) {
          this.lectures[i].safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.lectures[i].videoUrl);
        }
      }
    })
  }

  createLecture() {
    this.courseService.createLecture(this.newLecture, this.course.name).subscribe({
      next: (data) => {
        this.newLecture.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.newLecture.videoUrl)
        this.lectures.push({ ... this.newLecture });
      }
    })
  }

  moveToQuestion(index: number) {
    
    document.querySelector('.question-container.active')!.classList.remove('active');

    document.querySelectorAll('.question-container')[index].classList.add('active');

    this.currentQuestionIndex = index;
  }

  createTest() {

    // poslati ceo test..


  }
}
