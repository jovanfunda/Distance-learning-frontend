import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { AuthService } from './_services/auth.service';
import { CourseService } from './_services/course.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public tokenService: TokenStorageService, public authService: AuthService, private courseService: CourseService, private translate: TranslateService) { }

  ngOnInit() {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      this.translate.use(selectedLanguage);
    }
    if(this.authService.isLoggedIn) {
      this.courseService.getMyOwnCourses().subscribe({
        next: (data) => {
          this.courseService.myOwnCourses = data;
        }
      })
    }
  }

  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isProfessor() {
    return this.courseService.myOwnCourses.length > 0;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('selectedLanguage', lang);
}
}