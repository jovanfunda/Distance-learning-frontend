import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { CourseService } from '../_services/course.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = ""
  password = ""

  constructor(public authService: AuthService, public tokenService: TokenStorageService, private courseService: CourseService ,private router: Router) { }

  login(): void {

    this.authService.login(this.email, this.password).subscribe({
      next: (data) => {
        this.authService.isLoggedIn = true;
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data.user);
        this.router.navigate(["/home"]);
        this.courseService.getMyOwnCourses().subscribe({
          next: (data) => {
            this.courseService.myOwnCourses = data;
          }
        })
      },
      error: () => {
        window.alert("Uneti su pogresni kredencijali")
      }
    });
  }
} 