import { QuizService } from './../../../services/quiz.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  quizForm: FormGroup;
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _quizService: QuizService
    ) {
    this.quizForm = this.fb.group({
        title:['', Validators.required],
        description:['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  next(){
    if ( this.quizForm.invalid ) {
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3000);
    }else{
      this._quizService.titleQuiz = this.quizForm.get('title')?.value;
      this._quizService.descriptionQuiz = this.quizForm.get('title')?.value;
      this.router.navigate(['/dashboard/createQuestions']);
    }
  }

}
