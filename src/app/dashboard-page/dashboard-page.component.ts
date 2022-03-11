import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit,OnDestroy {

  topics!: string[];

  subscription!: Subscription;

  constructor(
    private router: Router,
    private quiz: QuizService
    ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
