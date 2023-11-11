import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent {

  course: Course;

  constructor(private router: Router) {
    this.course = history.state.course;
  }

  redirectToDetails() {
    this.router.navigate(['/details/', this.course.id], {state: {course: this.course}});
  }

  redirectToCreateLectures() {
    this.router.navigate(['/createLecture', this.course.id], {state: {course: this.course}});
  }

  createTest() {
    this.router.navigate(['/chooseLecture', this.course.id], {state: {course: this.course}});
  }

  courseTestData() {
    this.router.navigate(['/courseTestData', this.course.id], {state : {course: this.course}});
  }
}
