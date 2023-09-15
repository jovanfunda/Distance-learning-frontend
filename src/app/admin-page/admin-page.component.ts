import { Component } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { AuthService } from '../_services/auth.service'
import { Course } from '../_models/course';
import { User } from '../_models/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  courseName = "";
  selectedCourse!: Course;
  selectedCourseForAssignment!: Course;
  courses = [] as Course[];
  selectedAdmin! : User;
  selectedProfessorForAssignment!: User;
  admins = [] as User[];
  regularUsers = [] as User[];
  allUsers = [] as User[];
  userToAdmin! : User;

  constructor(private courseService: CourseService, private authService: AuthService, private tokenService: TokenStorageService, private userService: UserService) { }

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

    this.authService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        this.admins = this.admins.filter(admin => admin.email != this.tokenService.getUser().email)
        if(this.admins.length > 0) {
          this.selectedAdmin = this.admins[0]
        }
        this.allUsers = data;
      }
    })

    this.userService.getRegularUsers().subscribe({
      next: (data) => {
        this.regularUsers = data;
        if(this.regularUsers.length > 0) {
          this.userToAdmin = this.regularUsers[0]
        }
        this.allUsers.push(...this.regularUsers);
      }
    })
  }

  createCourse() {
    this.courseService.createCourse(this.courseName).subscribe({
      next: (course) => {
        console.log("Kreiran kurs = " + course); // null ako nije u redu, u ostalom ID kursa
        if(course != null) {
          this.courses.push(course)
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  deleteCourse() {
    this.courseService.deleteCourse(this.selectedCourse.id).subscribe({
      next: (isDeleted) => {
        console.log("Deleted = " + isDeleted + " " + this.selectedCourse)
        this.courses = this.courses.filter(course => course.id != this.selectedCourse.id)
        this.selectedCourse.id = this.courses[0].id
      },
      error: (err) => {
        console.log("Error " + JSON.stringify(err))
      }
    })
  }

  demoteAdmin() {
    this.authService.demoteAdmin(this.selectedAdmin.email).subscribe({
      next: (data) => {
        if(data) {
          this.admins = this.admins.filter(admin => admin.email != this.selectedAdmin.email);
          this.regularUsers.push(this.selectedAdmin);
        }
        // uklonjen admin, true/false
      },
      error: (err) => {
        console.log("Error " + JSON.stringify(err))
      }
    });
  }

  promoteToAdmin() {
    this.authService.promoteToAdmin(this.userToAdmin.email).subscribe({
      next: (data) => {
        this.admins.push(this.userToAdmin);
        this.regularUsers = this.regularUsers.filter(user => user.email != this.userToAdmin.email);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  assignProfessor() {
    this.courseService.assignProfessor(this.selectedProfessorForAssignment.email, this.selectedCourseForAssignment.name).subscribe({})
  }
}
