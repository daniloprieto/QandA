import { Question } from './../../../models/question';
import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

  listQuestions: Question[] = [];

  constructor(private _quizService: QuizService) {

    this._quizService.getQuestions()
    .subscribe(
      res => {
        this.listQuestions.push(res);
        console.log(this.listQuestions);
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
