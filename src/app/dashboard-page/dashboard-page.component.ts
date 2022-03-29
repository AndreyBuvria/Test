import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Subscription } from 'rxjs';
import { PreviewData } from '../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit,OnDestroy {

  previewData!: PreviewData[];

  subscription!: Subscription;

  constructor(
    private quiz: QuizService,
    ) { }

  ngOnInit(): void {
    this.subscription = this.quiz.getAllTests().subscribe(res => {
      this.previewData = res;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
