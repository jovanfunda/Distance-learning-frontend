import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses? : Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.courses_home().subscribe({
      next: (data) => {
        this.courses = data;
      },
       error: (err) => {
      console.log(err);
    }
  })
  }
}