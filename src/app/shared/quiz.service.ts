import { tap } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, map, Observable, take, takeWhile } from 'rxjs';
import { Timer } from './interfaces';

interface ITtest {
  question: string,
  quizzes: object[]
}

@Injectable({
  providedIn: 'root'
})
export class QuizService implements OnInit {

  constructor(
    private http: HttpClient,
    ) { }

  ngOnInit() {
  }

  public createTest(test: any) {
    const testHeaders = new HttpHeaders().set('Authorization', '')
    return this.http.post<ITtest>('https://testproj-40685-default-rtdb.firebaseio.com/.json',test);
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
}
