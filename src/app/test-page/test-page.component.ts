import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval, map, Observable, Subscription, take, takeWhile} from 'rxjs';
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
  public quizForm!: QuizForm;
  public quizId: number = 0;
  public testStatus = false;
  //public testTopic!: string;
  public answers: number[] = [];
  public idTest!: string;

  private clickOption!: number;
  private subscription!: Subscription;

  constructor(
    private quiz: QuizService,
    private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTimer(2);

    this.router.queryParams.subscribe((params: Params) => {
      this.idTest = params['id'];
    });

    this.setQuiz(this.idTest, this.quizId);
  }

  public onTimer(minutes: number): Observable<Timer> {
    return new Observable<Timer>(
      subscriber => {
        interval(1000)
          .pipe(take(minutes * 60))
          .pipe(takeWhile(x => x >= 0))
          .pipe(map(v => minutes * 60 - 1 - v))
          .subscribe(countdown => {
            const minutes = Math.floor(countdown / 60);
            const seconds = countdown - minutes * 60;

            subscriber.next({
              display: `${("0" + minutes.toString()).slice(-2)}:${("0" + seconds.toString()).slice(-2)}`,
              minutes: minutes,
              seconds: seconds
            });

            if (seconds <= 0 && minutes <= 0) {
              subscriber.complete();
            }
          });
      }
    )
  }

  public setAnswer(idOption: number) {
    this.clickOption = idOption;
  }

  public onNextQuiz() {
    this.answers.push(this.clickOption);
    this.quizId++;

    this.setQuiz(this.idTest, this.quizId);

    console.log(this.answers);
  }

  private setQuiz(idTest: string, idQuiz: number = 0) {
    this.quiz.getQuiz(idTest, idQuiz).subscribe(dataQuiz => {
      if(dataQuiz == undefined || null) { this.testStatus = true; }
      this.quizForm = dataQuiz;
    })
  }

  private getTimer(minutes: number) {
    this.subscription = this.onTimer(minutes).subscribe(response => {
      this.timerObj = response;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
