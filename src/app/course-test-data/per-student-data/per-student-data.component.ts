import { Component } from '@angular/core';
import { CourseTestDataService } from '../course-test-data.service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-per-student-data',
  templateUrl: './per-student-data.component.html',
  styleUrls: ['./per-student-data.component.css']
})
export class PerStudentDataComponent {

  public lineChartType: ChartType = 'line';
  public lineChartData!: ChartConfiguration['data'];

  show = false;
  students: any;
  studentScores: any[] = [];

  constructor(private courseTestDataService: CourseTestDataService) {
    this.students = this.courseTestDataService.students;
  }

  showStudentData(email: string) {
    this.studentScores = this.courseTestDataService.data.lectures.filter((lecture: any) => lecture.studentEmail === email);
    this.lineChartData = {
      datasets: [
        {
          data: this.studentScores.map(lecture => lecture.score),
          label: 'Ocene / scores',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: this.studentScores.map(lecture => lecture.lectureTitle),
    };
    this.show = true;
  }
}
