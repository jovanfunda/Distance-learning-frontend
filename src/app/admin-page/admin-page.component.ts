import { Component } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { AuthService } from '../_services/auth.service'
import { Course } from '../_models/course';
import { User } from '../_models/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {

  constructor(private router: Router) { }

  redirectToAdminCourseManage() {
    this.router.navigate(['/adminCourseManage/']);
  }

  redirectToAdminManager() {
    this.router.navigate(['/adminManager/']);
  }
}
