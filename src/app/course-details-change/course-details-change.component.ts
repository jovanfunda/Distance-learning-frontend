import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'app-course-details-change',
  templateUrl: './course-details-change.component.html',
  styleUrls: ['./course-details-change.component.css']
})
export class CourseDetailsChangeComponent {

  course: Course;

  constructor(private courseService: CourseService) {
    this.course = history.state.course;
  }

  changeCourseDescription() {
    this.courseService.changeCourseDescription(this.course.id, this.course.description, this.course.pictureURL).subscribe({
      next: () => {
        window.alert("Uspesno izmenjen kurs " + this.course.name)
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }
}
