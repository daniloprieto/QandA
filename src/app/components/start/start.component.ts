import { Subscription } from 'rxjs';
import { ResQuizService } from './../../services/res-quiz.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {

  public error: boolean = false;
  public pin: string = '';
  errorText: string = '';
  loading: boolean = false;
  code$: Subscription = new Subscription();

  constructor(
    private _resQuiz: ResQuizService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.code$.unsubscribe();
  }

  ingress(){
    if (this.pin === '') {

      this.errorMessage('Please, enter a pin');

      return;

    }

    this.loading = true;

    this.code$ = this._resQuiz.searchByCode(this.pin)
      .subscribe(
        data => {

          if ( data.empty ) {

            this.loading = false;

            this.errorMessage('Invalid pin');

          }else{

            data.forEach( (element:any) => {

              const quiz: Quiz = {
                id: element.id,
                ...element.data()
              };

              this._resQuiz.quiz = quiz;

              this.router.navigate(['/play']);

            });
          }

        },error => {

          console.error(error);

          this.loading = false;
        }
      );
  }

  errorMessage(text: string){
    this.errorText = text;
    this.error = true;
    this.pin = '';

    setTimeout(() => {
      this.error = false;
    }, 4000);
  }



}
