import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  score = 0;
  lectureID!: number;

  constructor(private route: ActivatedRoute, private testService: TestService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lectureID = +params.get('lectureID')!;
      this.testService.getQuestionsForTest(this.lectureID).subscribe({
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
    this.score = 0;

    this.questions.forEach((question) => {
      if(question.selectedAnswer == question.rightAnswer) {
        this.score += 1;
      }
    });

    this.testService.submitScore(this.lectureID, this.score).subscribe({
      next: () => {
        window.alert("Zavrsen test, tvoj broj poena je: " + this.score);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
