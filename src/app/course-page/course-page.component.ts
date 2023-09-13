import { Component } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';
import { Lecture } from '../_models/lecture';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {

  course: Course;
  lectures = [] as Lecture[];

  constructor(private courseService: CourseService) {
    this.course = history.state.course;
   }

  ngOnInit(): void {
    this.courseService.getLectures(this.course.id).subscribe({
      next: (data) => {
          this.lectures = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  
}
