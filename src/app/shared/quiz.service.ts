import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, tap } from 'rxjs';
import { DataResult, PreviewData, QuizForm, Timer } from './interfaces';
import { environment } from 'src/environments/environment';

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
    return this.http.post<ITtest>(environment.urlFb,test);
  }

  public getAllTests() {
    return this.http.get<PreviewData>(environment.urlFb)
      .pipe(
        map((data: any) => {
          return Object.keys(data)
            .map(key => ({
              topic: data[key].topic,
              id: data[key].id
            }))
        })
      )
  }

  public getQuiz(idTest: string, idQuiz: number) {
    return this.http.get<QuizForm[]>(environment.urlFb)
      .pipe(
        map((x: any) => {
          let quiz!: QuizForm;
          Object.keys(x).forEach( key => {
            if(x[key].id == idTest) {
              quiz = x[key].quizzes[idQuiz];
            }
          });

          return quiz;
        })
      )
  }

  public checkAnswers(idTest: string, answers: number[]) {
    return this.http.get(environment.urlFb)
      .pipe(
        map((data: any) => {
          let test!: QuizForm[];
          Object.keys(data).forEach( key => {
            if(data[key].id == idTest) {
              test = data[key].quizzes;
            }
          });

          return test;
        })
      )
      .pipe(
        map(data => {
          let result: DataResult = {
            correct: 0,
            uncorrect: 0
          };

          data.forEach((it, index) => {
            +it.markAnswer == +answers[index]? ++result.correct : ++result.uncorrect;
          });

          return result;
        })
      )
  }

  public getLengthTests() {
    return this.http.get(environment.urlFb)
      .pipe(
        map(data => {
          return data == undefined || data == null ? 0: Object.keys(data).length;
        })
      )
  }
}
