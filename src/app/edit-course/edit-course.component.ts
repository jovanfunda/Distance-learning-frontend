import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { LectureDTO } from '../_models/lectureDTO'
import { CourseService } from '../_services/course.service';

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
    video_url: '',
    data: ''
  };

  constructor(private courseService: CourseService) {
    this.newLecture.title = ''
    this.newLecture.video_url = ''
    this.newLecture.data = ''
    this.course = history.state.course;

    this.courseService.getLectures(this.course.id).subscribe({
      next: (data) => {
        this.lectures = data;
      }
    })
  }

  createLecture() {
    this.courseService.createLecture(this.newLecture, this.course.name).subscribe({
      next: (data) => {
        this.lectures.push({ ... this.newLecture });
        console.log(data);
      }
    })
  }
}
