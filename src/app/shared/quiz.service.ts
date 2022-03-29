import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, tap } from 'rxjs';
import { PreviewData, QuizForm, Timer } from './interfaces';

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
    return this.http.post<ITtest>('https://testproj-40685-default-rtdb.firebaseio.com/.json',test);
  }

  public getAllTests() {
    return this.http.get<PreviewData>('https://testproj-40685-default-rtdb.firebaseio.com/.json')
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
    return this.http.get<QuizForm[]>('https://testproj-40685-default-rtdb.firebaseio.com/.json')
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

  public getLengthTests() {
    return this.http.get('https://testproj-40685-default-rtdb.firebaseio.com/.json')
      .pipe(
        map(data => {
          return data == undefined || data == null ? 0: Object.keys(data).length;
        })
      )
  }
}
