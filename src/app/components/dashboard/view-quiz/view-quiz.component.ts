import { Subscription } from 'rxjs';
import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit, OnDestroy {

  id: string;
  loading: boolean = false;
  quiz: Quiz | undefined;

  quiz$: Subscription = new Subscription();

  constructor(
    private _quizService: QuizService,
    private aRoute: ActivatedRoute) {
      this.id = this.aRoute.snapshot.paramMap.get('id')!;
    }

  ngOnInit(): void {
    this.getQuiz();
  }

  ngOnDestroy(){
    this.quiz$.unsubscribe();
  }

  getQuiz(){

    this.loading = true;

    this.quiz$ = this._quizService.getQuiz(this.id)
      .subscribe(
        doc => {
          this.quiz = doc.data();
          this.loading = false;

        },
        error => {

          console.error(error);

          this.loading = false;
        }
      );
  }

}
