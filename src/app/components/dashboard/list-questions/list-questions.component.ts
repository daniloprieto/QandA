import { ToastrService } from 'ngx-toastr';
import { Quiz } from './../../../models/quiz';
import { Question } from './../../../models/question';
import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.scss']
})
export class ListQuestionsComponent implements OnInit {

  loading: boolean = false;

  listQuestions: Question[] = [];

  titleQuiz: string;
  descriptionQuiz: string;

  constructor(
    private _quizService: QuizService,
    private router: Router,
    private toastr: ToastrService) {

    this._quizService.getQuestions()
    .subscribe(
      res => {
        this.listQuestions.push(res);

      },
      error => {
        console.error(error);
      }
    );

    this.titleQuiz = this._quizService.titleQuiz;
    this.descriptionQuiz = this._quizService.descriptionQuiz;
  }

  ngOnInit(): void {

    if (this.titleQuiz === '' || this.descriptionQuiz === '' ) {

      this.router.navigate(['/dashboard']);

    }
  }

  deleteQuestion(index: number) {
    this.listQuestions.splice(index, 1);
  }

  saveQuiz(){

    this.loading = true;

    const code: string = this.generateCode();
    const user: User = JSON.parse( localStorage.getItem('user')! );

    const quiz: Quiz = {
      uid: user.uid,
      title: this.titleQuiz,
      description: this.descriptionQuiz,
      code: code,
      quantityQuestions: this.listQuestions.length,
      createdDate: new Date(),
      listQuestions: this.listQuestions
    };

    this._quizService.createQuiz(quiz).then(
      data => {

        this.toastr.success('this questionnaire was successfully registered', 'Saved quiz')
        this.router.navigate(['/dashboard']);

      }).catch(error => {

        this.loading = false;

        console.error(error);

    });


  }

  generateCode(): string {

    return nanoid(6).toUpperCase();
  }
}
