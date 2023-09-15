import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import { CourseService } from './_services/course.service';
import { Course } from './_models/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  userEmail?: string;
  myOwnCourses = [] as Course[];

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.userEmail = this.tokenStorageService.getUser().email;
    }

    this.courseService.getMyOwnCourses().subscribe({
      next: (myOwnCourses) => {
        this.myOwnCourses = myOwnCourses;
      } 
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isProfessor() {
    return this.myOwnCourses.length > 0;
  }
}