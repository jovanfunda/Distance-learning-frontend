import { Component } from '@angular/core';
import { Course } from '../_models/course';
import { TestService } from '../_services/test.service';
import { Router } from '@angular/router';
import { ExcelService } from '../_services/excel.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent {

  course: Course;

  constructor(private router: Router, private testService: TestService, private excelService: ExcelService) {
    this.course = history.state.course;
  }

  redirectToDetails() {
    this.router.navigate(['/details/', this.course.id], {state: {course: this.course}});
  }

  redirectToCreateLectures() {
    this.router.navigate(['/createLecture', this.course.id], {state: {course: this.course}});
  }

  deleteTestAlert() {
    this.testService.hasTest(this.course.id).subscribe({
      next: (hasCourse) => {
        if(hasCourse) {
          var confirm = window.confirm('Ukoliko zelite da kreirate test, postojeci test ce biti izbrisan');

          if (confirm) {
            this.testService.deleteTest(this.course.id).subscribe();
            this.router.navigate(['/createTest', this.course.id], {state: {course: this.course}});
          }
        } else {
          this.router.navigate(['/createTest', this.course.id], {state: {course: this.course}});
        }
      }
    });
  }

  downloadData() {
    this.testService.getDataForDownload(this.course.id).subscribe({
      next: (data) => {
        const fileName = this.course.name + " - data";
        this.excelService.generateExcel(data, fileName);
      }
    })
  }
}
