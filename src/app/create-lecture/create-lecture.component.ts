import { Component } from '@angular/core';
import { LectureDTO } from '../_models/lectureDTO';
import { CourseService } from '../_services/course.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from '../_models/course';

@Component({
  selector: 'app-create-lecture',
  templateUrl: './create-lecture.component.html',
  styleUrls: ['./create-lecture.component.css']
})
export class CreateLectureComponent {

  course: Course;
  lectures = [] as LectureDTO[];
  newLecture: LectureDTO = {
    title: '',
    videoURL: '',
    data: '',
    safeURL: ''
  };

  constructor(private courseService: CourseService, private sanitizer: DomSanitizer) {
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

  createLecture() {
    this.courseService.createLecture(this.newLecture, this.course.name).subscribe({
      next: () => {
        this.newLecture.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.newLecture.videoURL)
        this.lectures.push({ ... this.newLecture });
      }
    })
  }
}
