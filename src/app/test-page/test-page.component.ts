import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs';
import { QuizForm, Timer } from '../shared/interfaces';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit, OnDestroy {

  public timerObj!: Timer;
  //public quizForm!: QuizForm;
  public choiseMark!: object;

  private subscription!: Subscription;
  private answersMark!: object[];

  constructor(
    private quiz: QuizService,) { }

  ngOnInit(): void {
    this.getTimer();
  }

  public onNextQuiz() {
    this.answersMark!.push(this.choiseMark);
  }

  private getTimer() {
    this.subscription = this.quiz.onTimer(2).subscribe(response => {
      this.timerObj = response;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
