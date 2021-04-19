import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.scss']
})
export class CreateQuestionsComponent implements OnInit {

  constructor(
    private _quizService: QuizService
  ) { }

  ngOnInit(): void {

  }

}
