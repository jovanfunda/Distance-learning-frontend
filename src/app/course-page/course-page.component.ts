import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent {

  courseId?: number;
  course: Course;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.course = history.state.course;
   }

  ngOnInit(): void {
  } 

  

}
