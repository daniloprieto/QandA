import { QuizService } from './../../../services/quiz.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-list-questionnaires',
  templateUrl: './list-questionnaires.component.html',
  styleUrls: ['./list-questionnaires.component.scss']
})
export class ListQuestionnairesComponent implements OnInit, OnDestroy {

  user$: Subscription = new Subscription();
  quiz$: Subscription = new Subscription();
  listQuizzes: Quiz[] = [];
  loading: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private _quizService: QuizService,
    private router: Router ) { }

  ngOnInit(): void {

    this.loading = true;

    this.user$ = this.afAuth.user.subscribe(
      user => {
        if ( user && user.emailVerified ){
          //load the quizzes
          this.getQuizzes(user.uid);
        }else{
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(){
    this.user$.unsubscribe();
    this.quiz$.unsubscribe();
  }

  getQuizzes(uid: string){
   this.quiz$ =  this._quizService.getQuizByIdUser(uid)
      .subscribe(
        res => {

          this.listQuizzes = [];

          this.loading = false;

          res.forEach( (element: any) => {
            this.listQuizzes.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });

          })
        },
        error => {
          console.error(error);
          this.loading = false;
        }
      );

  }

}
