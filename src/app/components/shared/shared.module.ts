import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewResultComponent } from './view-result/view-result.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    ViewResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent
  ]
})
export class SharedModule { }
