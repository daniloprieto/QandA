import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';

const routes: Routes = [
  { path:'', component: ListQuestionnairesComponent },
  { path:'createQuiz', component: CreateQuizComponent },
  { path:'createQuestions', component: CreateQuestionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }