import { ViewResultComponent } from './../shared/view-result/view-result.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', component: EnterNameComponent },
  { path:'initialCounter', component: InitialCounterComponent },
  { path:'takeQuiz', component: TakeQuizComponent },
  { path:'viewResult/:id', component: ViewResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
