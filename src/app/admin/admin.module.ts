import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { TestListPageComponent } from './test-list-page/test-list-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    AddPageComponent,
    TestListPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
          { path: 'tests', component: TestListPageComponent, canActivate: [AuthGuard] },
          { path: '**', redirectTo: '/admin/login' }
        ]
      }
    ])
  ],
  providers: [AuthGuard]
})
export class AdminModule { }
