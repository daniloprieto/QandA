import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListQuestionnairesComponent,
    CreateQuizComponent,
    CreateQuestionsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
