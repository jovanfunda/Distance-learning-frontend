import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses = [] as Course[];
  enrolledCourses = [] as Course[];
  notEnrolledCourses = [] as Course[];

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

        this.notEnrolledCourses = this.courses;
        for(let i = 0; i < this.courses.length; i++) {
          for(let j = 0; j < this.enrolledCourses.length; j++) {
            if(this.courses[i].id == this.enrolledCourses[j].id) {
              this.notEnrolledCourses.splice(i, 1);
           }
         }
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  navigateToCourse(course: Course) {
    this.router.navigate(['/course/', course.id], {state: {course: course}});
  }

  enrollCourse(course: Course) {
    this.courseService.enrollCourse(course).subscribe({
      next: (isSuccessful) => {
        if (isSuccessful) {
          this.courses = this.courses.filter(element => element.id !== course.id);
          this.enrolledCourses.push(course);
          this.notEnrolledCourses = this.notEnrolledCourses.filter(item => item.id != course.id)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}