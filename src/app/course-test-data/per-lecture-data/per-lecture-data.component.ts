import { Component } from '@angular/core';
import { CourseTestDataService } from '../course-test-data.service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-per-lecture-data',
  templateUrl: './per-lecture-data.component.html',
  styleUrls: ['./per-lecture-data.component.css']
})
export class PerLectureDataComponent {

  public lineChartType: ChartType = 'bar';
  public lineChartData!: ChartConfiguration['data'];

  lectures = new Set<string>;
  show = false;

  constructor(private courseTestDataService: CourseTestDataService) {
    this.lectures = this.courseTestDataService.lectures;
  }

  showLectureData(title: string) {
    this.lineChartData = {
      datasets: [
        {
          data: [2, 2, 3, 5, 4, 3],
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
      labels: [0, 1, 2, 3, 4, 5],
    };
    this.show = true;
  }

}
