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

  searchTerm = "";
  allCoursesFiltered = [] as Course[];
  enrolledCoursesFiltered = [] as Course[];
  notEnrolledCoursesFiltered = [] as Course[];

  constructor(public courseService: CourseService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courseService.allCourses = data;
        this.allCoursesFiltered = data;

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
              this.enrolledCoursesFiltered = this.courseService.enrolledCourses;
              this.notEnrolledCoursesFiltered = this.courseService.notEnrolledCourses;
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
    this.courseService.enrollCourse(course.id).subscribe({
      next: () => {
        this.courseService.enrolledCourses.push(course);
        this.courseService.notEnrolledCourses = this.courseService.notEnrolledCourses.filter(item => item.id != course.id)
        this.enrolledCoursesFiltered = this.courseService.enrolledCourses;
        this.notEnrolledCoursesFiltered = this.courseService.notEnrolledCourses;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSearchTermChange() {
    this.allCoursesFiltered = this.courseService.allCourses;
    this.allCoursesFiltered.forEach(course => {
      if(!course.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        this.allCoursesFiltered = this.allCoursesFiltered.filter(item => item.id != course.id)
      }
    })

    this.enrolledCoursesFiltered = this.courseService.enrolledCourses;
    this.enrolledCoursesFiltered.forEach(course => {
      if(!course.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        this.enrolledCoursesFiltered = this.enrolledCoursesFiltered.filter(item => item.id != course.id)
      }
    })

    this.notEnrolledCoursesFiltered = this.courseService.notEnrolledCourses;
    this.notEnrolledCoursesFiltered.forEach(course => {
      if(!course.name.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        this.notEnrolledCoursesFiltered = this.notEnrolledCoursesFiltered.filter(item => item.id != course.id)
      }
    })
  }
}