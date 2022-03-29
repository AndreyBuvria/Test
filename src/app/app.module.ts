import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { StartPageComponent } from './start-page/start-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TestPageComponent } from './test-page/test-page.component';
import { LoadingPlaceholderComponent } from './shared/loading-placeholder/loading-placeholder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultPageComponent } from './test-page/result-page/result-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    StartPageComponent,
    DashboardPageComponent,
    TestPageComponent,
    LoadingPlaceholderComponent,
    ResultPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
