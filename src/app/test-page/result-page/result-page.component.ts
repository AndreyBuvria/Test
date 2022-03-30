import { Component, Input, OnInit } from '@angular/core';
import { DataResult } from 'src/app/shared/interfaces';
import { QuizService } from 'src/app/shared/quiz.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  @Input() selectedAnswers!: number[];
  @Input() idTest!: string;

  public dataResult!: DataResult;

  constructor(
    private quiz: QuizService
  ) { }

  ngOnInit(): void {
    this.quiz.checkAnswers(this.idTest, this.selectedAnswers).subscribe(response => {
      this.dataResult = response;
    });
  }

}
