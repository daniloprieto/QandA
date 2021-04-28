import { ToastrService } from 'ngx-toastr';
import { ResQuizService } from './../../../services/res-quiz.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  id: string;
  loading: boolean = false;
  listAnswersUser: any[] = [];
  answersQuiz$: Subscription = new Subscription();

  constructor(
    private _aRoute: ActivatedRoute,
    private _resQuiz: ResQuizService,
    private _toastr: ToastrService
  ) {
    this.id = this._aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getAnswersByIdQuiz();
  }

  ngOnDestroy(){
    this.answersQuiz$.unsubscribe;
  }

  getAnswersByIdQuiz(){

    this.loading = true;

    this.answersQuiz$ = this._resQuiz.getAnswersByIdQuiz(this.id)
      .subscribe(
        res => {
          this.listAnswersUser = [];
          res.forEach( (element: any) => {
            this.listAnswersUser.push(
              {
                id: element.payload.doc.id,
                ...element.payload.doc.data()
              }
            );
          });
          this.loading = false;
        }, error => {
          console.error(error);
          this.loading = false;
        }
      );
  }

  deleteAnswersUser(id: string){
    this.loading = true;

    this._resQuiz.deleteAnswersUser(id).then(
      res => {

        this._toastr.info('The answers were deleted', 'Deleted Answers');

        this.loading = false;
      },
      error => {

        this._toastr.error("You can't delete answers","Error");
        console.log(error);
        this.loading = false;
      }
    );

  }
}
