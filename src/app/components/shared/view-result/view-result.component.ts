import { Subscription } from 'rxjs';
import { ResQuizService } from './../../../services/res-quiz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss']
})
export class ViewResultComponent implements OnInit, OnDestroy {

  id: string;
  loading: boolean = false;
  answersUser: any;
  beforeView: string = '';

  answersUser$: Subscription = new Subscription();

  constructor(
    private _resQuiz: ResQuizService,
    private _aRoute: ActivatedRoute,
    private _router: Router,
    ) {
      this.beforeView = this._aRoute.snapshot.url[0].path;
      this.id = this._aRoute.snapshot.paramMap.get('id')!;
    }

  ngOnInit(): void {
    this.getAnswersUser();
  }

  ngOnDestroy(){
    this.answersUser$.unsubscribe();
  }

  getAnswersUser(){

    this.loading = true;

    this.answersUser$ = this._resQuiz.getAnswersUser(this.id)
      .subscribe(
        doc => {

          if ( !doc.exists ){
            this.return();
            return;
          }

          this.answersUser = doc.data();

          this.loading = false;

        }, error => {

          console.error(error);
          this.loading = false;

        }
      );
  }

  return(){

    if ( this.beforeView === 'answersUserAdmin') {

      this._router.navigate(['/dashboard/statistics', this.answersUser.idQuiz])

    }else{

      this._router.navigate(['/']);
    }
  }

}
