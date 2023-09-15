import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.css']
})
export class CourseManageComponent {

  constructor(public courseService: CourseService, private router: Router) {
  }

  ngOnInit(): void {
    this.courseService.getMyOwnCourses().subscribe({
      next: (data) => {
        this.courseService.myOwnCourses = data;
      }
    })
  }

  editCourse(course: Course) {
    this.router.navigate(['/editCourse/', course.id], {state: {course: course}});
  }
}
