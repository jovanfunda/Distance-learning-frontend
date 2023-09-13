import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses? : Course[];
  enrolledCourses? : Course[];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
       error: (err) => {
      console.log(err);
    }
  })

    this.courseService.getMyCourses().subscribe({
      next: (myCourses) => {
        this.enrolledCourses = myCourses;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  enrollCourse(course: Course) {
    this.courseService.enrollCourse(course).subscribe({
      next: (isSuccessful) => {
        if (isSuccessful) {
          course.enrolled = true
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  navigateToCourse(course: Course) {
    this.router.navigate(['/course/', course.id], {state: {course: course}});
  }
}