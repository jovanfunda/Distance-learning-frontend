import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public courseService: CourseService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseService.allCourses = data;

        if(this.authService.isLoggedIn) {
          this.courseService.getEnrolledCourses().subscribe({
            next: (myCourses) => {
              this.courseService.enrolledCourses = myCourses;
              this.courseService.notEnrolledCourses = this.courseService.allCourses;
              for(let i = 0; i < this.courseService.allCourses.length; i++) {
                for(let j = 0; j < this.courseService.enrolledCourses.length; j++) {
                  if(this.courseService.allCourses[i].id == this.courseService.enrolledCourses[j].id) {
                    this.courseService.notEnrolledCourses.splice(i, 1);
                }
              }
              }
            },
            error: (err) => {
              console.log(err);
            }
          })
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

  navigateToLogin() {
    this.router.navigate(["/login"]);
  }

  enrollCourse(course: Course) {
    this.courseService.enrollCourse(course).subscribe({
      next: () => {
        this.courseService.allCourses = this.courseService.allCourses.filter(element => element.id !== course.id);
        this.courseService.enrolledCourses.push(course);
        this.courseService.notEnrolledCourses = this.courseService.notEnrolledCourses.filter(item => item.id != course.id)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}