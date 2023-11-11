import { Component, OnInit } from '@angular/core';
import { CourseTestDataService } from '../course-test-data.service';

@Component({
  selector: 'app-all-test-data',
  templateUrl: './all-test-data.component.html',
  styleUrls: ['./all-test-data.component.css']
})
export class AllTestDataComponent implements OnInit {

  constructor(private courseTestDataService: CourseTestDataService) {}

  ngOnInit(): void {
    let container = document.getElementById('table-container');
    let table = container!.querySelector('table') as HTMLTableElement;

    if (container) {
      table = this.createTable(table);
    }
  }


  createTable(table: HTMLTableElement) {

    let thead = table.createTHead();
    let headerRow = thead.insertRow(0);

    let th = document.createElement('th');
    headerRow.appendChild(th);

    for (const lecture of this.courseTestDataService.lectures) {
      let th = document.createElement('th');
      th.innerHTML = lecture;
      headerRow.appendChild(th);
    }
  
    let tbody = table.createTBody();

    for (const student of this.courseTestDataService.students) {
      let row = tbody.insertRow();
  
      let cell = row.insertCell(0);
      cell.innerHTML = student;
  
      for (let i = 1; i <= this.courseTestDataService.lectures.size; i++) {
        let lectureTitle = this.getTableCell(0, i);
        let studentEmail = this.getTableCell(row.rowIndex, 0);
  
        let score = this.findScoreForLecture(lectureTitle, studentEmail);
  
        cell = row.insertCell(i);
        cell.innerHTML = score ? score.toString() : 'N/A';
      }
    }

    return table;
  }

  getTableCell(row: number, col: number) {
    const container = document.getElementById('table-container');
  
    if (container) {
      const table = container.querySelector('table') as HTMLTableElement;
      return table.rows[row].cells[col].innerHTML;
    }

    return 'Cell not found';
  }

  findScoreForLecture(lectureTitle: string, studentEmail: string): number | undefined {
    for (const lecture of this.courseTestDataService.data.lectures) {
      if (lecture.lectureTitle === lectureTitle && lecture.studentEmail === studentEmail) {
        return lecture.score;
      }
    }
    return undefined;
  }
}
