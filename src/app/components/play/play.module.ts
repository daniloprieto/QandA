import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { EnterNameComponent } from './enter-name/enter-name.component';
import { InitialCounterComponent } from './initial-counter/initial-counter.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';


@NgModule({
  declarations: [
    EnterNameComponent,
    InitialCounterComponent,
    TakeQuizComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlayRoutingModule
  ]
})
export class PlayModule { }
