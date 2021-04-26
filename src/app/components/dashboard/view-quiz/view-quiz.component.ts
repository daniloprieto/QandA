import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  id: string;
  loading: boolean = false;
  quiz: Quiz | undefined;

  constructor(
    private _quizService: QuizService,
    private aRoute: ActivatedRoute) {
      this.id = this.aRoute.snapshot.paramMap.get('id')!;
    }

  ngOnInit(): void {
  }

  getQuiz(){

    this.loading = true;

    this._quizService.getQuiz(this.id)
      .subscribe(
        doc => {
          this.quiz = doc.data();
          console.log(doc.data());
          console.log(this.id);
          this.loading = false;

        },
        error => {

          console.error(error);

          this.loading = false;
        }
      );
  }

}
