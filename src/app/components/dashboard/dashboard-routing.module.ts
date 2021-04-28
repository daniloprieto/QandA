import { ViewResultComponent } from './../shared/view-result/view-result.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { ListQuestionnairesComponent } from './list-questionnaires/list-questionnaires.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';

const routes: Routes = [
  { path:'', component: ListQuestionnairesComponent },
  { path:'createQuiz', component: CreateQuizComponent },
  { path:'createQuestions', component: CreateQuestionsComponent },
  { path:'viewQuiz/:id', component: ViewQuizComponent },
  { path:'statistics/:id', component: StatisticsComponent },
  { path:'answersUserAdmin/:id', component: ViewResultComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
