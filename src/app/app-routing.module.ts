import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { StartPageComponent } from './start-page/start-page.component';
import { TestPageComponent } from './test-page/test-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/start', pathMatch: 'full' },
      { path: 'start', component: StartPageComponent },
      { path: 'test', component: TestPageComponent },
      { path: 'test/:quiz', component: TestPageComponent },
      { path: 'dashboard', component: DashboardPageComponent },
      //{ path: '**', redirectTo: '/start' }
    ]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
