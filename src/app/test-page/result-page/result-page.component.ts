import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  @Input() topicTest!: string;
  @Input() selectedAnswers!: number[];

  constructor() { }

  ngOnInit(): void {
  }

}
