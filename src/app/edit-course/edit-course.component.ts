import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { TestService } from '../_services/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {

  course: Course;

  constructor(private router: Router, private testService: TestService) {
    this.course = history.state.course;
  }

  redirectToDetails() {
    this.router.navigate(['/details/', this.course.id], {state: {course: this.course}});
  }

  redirectToCreateLectures() {
    this.router.navigate(['/createLecture', this.course.id], {state: {course: this.course}});
  }

  deleteTestAlert() {
    var confirm = window.confirm('If this course already has a test, it will be permanently deleted');

    if (confirm) {
      this.testService.deleteTest(this.course.id).subscribe();
      this.router.navigate(['/createTest', this.course.id], {state: {course: this.course}});
    }
  }
}
