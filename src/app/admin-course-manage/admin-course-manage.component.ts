import { Component } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user'
import { Course } from '../_models/course'

@Component({
  selector: 'app-admin-course-manage',
  templateUrl: './admin-course-manage.component.html',
  styleUrls: ['./admin-course-manage.component.css']
})
export class AdminCourseManageComponent {

  courseName = "";
  selectedCourse!: Course;
  selectedCourseForAssignment!: Course;
  selectedProfessorForAssignment!: User;
  courses = [] as Course[];
  allUsers = [] as User[];

  constructor(private courseService: CourseService, private userService: UserService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        if(this.courses.length > 0) {
          this.selectedCourse = courses[0];
        }
      },
      error: (err) => {
        console.log(err)
      }
    })

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.allUsers = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  createCourse() {
    this.courseService.createCourse(this.courseName).subscribe({
      next: (course) => {
        this.courses.push(course)
        window.alert("Kurs " + course.name + " uspesno kreiran!")
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.selectedCourse.id).subscribe({
      next: () => {
        window.alert("Kurs " + this.selectedCourse.name + " uspesno uklonjen!")
        this.courses = this.courses.filter(course => course.id != this.selectedCourse.id)
        this.selectedCourse.id = this.courses[0].id
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  assignProfessor() {
    this.courseService.assignProfessor(this.selectedProfessorForAssignment.email, this.selectedCourseForAssignment.id).subscribe({
      next: () => {
        window.alert("Kurs " + this.selectedCourseForAssignment.name + " uspesno dodeljen profesoru " + this.selectedProfessorForAssignment.email);
      }
    })
  }

}
