import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../_services/test.service';
import { Question } from '../_models/question';
import { TestAnswer } from '../_models/testAnswer';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent {

  questions = [] as Question[];
  currentQuestionIndex = 0;
  testAnswer = [] as TestAnswer[];
  courseID = 0;

  constructor(private route: ActivatedRoute, private testService: TestService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseID = +params.get('courseID')!;
      this.testService.getQuestionsForTest(this.courseID).subscribe({
        next: (data) => {
          this.questions = data;
          this.questions.forEach(question => {
            this.shuffleAnswers(question);
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  shuffleAnswers(question: Question) {
    question.answers = [question.rightAnswer, question.wrongAnswer1, question.wrongAnswer2, question.wrongAnswer3];
    for (let i = question.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [question.answers[i], question.answers[j]] = [question.answers[j], question.answers[i]];
    }
  }

  moveToQuestion(index: number) {
    
    document.querySelector('.question-container.active')!.classList.remove('active');

    document.querySelectorAll('.question-container')[index].classList.add('active');

    this.currentQuestionIndex = index;
  }

  submitTest() {
    let score = 0;

    this.questions.forEach((question) => {
      if(question.selectedAnswer == question.rightAnswer) {
        score += 1;
      }
    });

    this.testService.submitScore(this.courseID, score).subscribe({
      next: () => {
        console.log("Azuriran skor u bazi")
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
