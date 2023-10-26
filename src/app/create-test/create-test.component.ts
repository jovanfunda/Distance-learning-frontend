import { Component } from '@angular/core';
import { CourseService } from '../_services/course.service';
import { Question } from '../_models/question';
import { Course } from '../_models/course';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent {

  course: Course;
  questions = ['1', '2', '3', '4', '5']
  currentQuestionIndex = 0;

  questionValues: string[] = [];
  rightAnswerValues: string[] = [];
  wrongAnswerValues: string[] = [];

  startDate!: Date;
  time!: string;

  constructor(private courseService: CourseService) {
    this.time = "12:00 AM";
    this.course = history.state.course;
  }

  moveToQuestion(index: number) {
    document.querySelector('.question-container.active')!.classList.remove('active');
    document.querySelectorAll('.question-container')[index].classList.add('active');
    this.currentQuestionIndex = index;
  }

  createTest() {
    let questions = [] as Question[];

    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questionValues[i];
      const rightAnswer = this.rightAnswerValues[i];
      const wrongAnswer1 = this.wrongAnswerValues[i*3]
      const wrongAnswer2 =  this.wrongAnswerValues[i * 3 + 1]
      const wrongAnswer3 =  this.wrongAnswerValues[i * 3 + 2]
      
      let quest: Question = {
        question,
        rightAnswer,
        wrongAnswer1,
        wrongAnswer2,
        wrongAnswer3,
        selectedAnswer: null,
        answers: null
      }

      questions.push(quest)
    }

    this.courseService.createTest(this.course.id, questions, this.startDate, this.time).subscribe({
      next: (data) => {
        window.alert("Uspesno kreiran test za kurs " + this.course.name)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getOptionValue(option: string, i: number) {
    if (option === 'Right answer') {
      return this.rightAnswerValues[i];
    } else {
      const optionIndex = ['Wrong answer 1', 'Wrong answer 2', 'Wrong answer 3'].indexOf(option);
      return this.wrongAnswerValues[i * 3 + optionIndex];
    }
  }

  updateOptionValue(newValue: string, option: string, i: number) {
    if (option === 'Right answer') {
      this.rightAnswerValues[i] = newValue;
    } else {
      const optionIndex = ['Wrong answer 1', 'Wrong answer 2', 'Wrong answer 3'].indexOf(option);
      this.wrongAnswerValues[i * 3 + optionIndex] = newValue;
    }
  }

  changeCourseDescription() {
    this.courseService.changeCourseDescription(this.course.id, this.course.description, this.course.pictureURL).subscribe({
      next: (data) => {
        
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }

}
