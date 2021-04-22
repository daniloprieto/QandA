import { Question } from './../../../models/question';
import { Answer } from './../../../models/answer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.scss']
})
export class CreateQuestionsComponent implements OnInit {

  addQuestion: FormGroup;
  showError: boolean = false;
  showError2: boolean = false;

  constructor(
    private _quizService: QuizService,
    private fb: FormBuilder
  ) {
    this.addQuestion = this.fb.group({
      title:['', Validators.required],
      seconds:[10, Validators.required],
      points:[1000, Validators.required],
      answer1: this.fb.group({
        title:['', Validators.required],
        isTrue:[false, Validators.required]
      }),
      answer2: this.fb.group({
        title:['', Validators.required],
        isTrue:[false, Validators.required]
      }),
      answer3: this.fb.group({
        title:'',
        isTrue:false
      }),
      answer4: this.fb.group({
        title:'',
        isTrue:false
      }),

    });
   }

  ngOnInit(): void {

  }

  addQ(){

    if ( this.addQuestion.invalid === true ) {

      this.error();

    } else if( this.allFalse() === true) {

      this.error();

    }

    let answersNumber: string[] = ['answer1', 'answer2', 'answer3', 'answer4'];
    let listAnswers: Answer[] = [];

    for ( let answer of answersNumber ) {

      const resTitle = this.addQuestion.get(answer)?.get('title')?.value;
      const resIsTrue = this.addQuestion.get(answer)?.get('isTrue')?.value;

      const res: Answer = {
        title: resTitle,
        isTrue: resIsTrue
      };

      if ( this.addQuestion.get(answer)?.get('title')?.value !== '' ) {

        listAnswers.push(res);

      }

    }

    const title = this.addQuestion.get('title')?.value;
    const seconds = this.addQuestion.get('seconds')?.value;
    const points = this.addQuestion.get('points')?.value;

    const newQuestion: Question = {
      title: title,
      seconds: seconds,
      points: points,
      listAnswers: listAnswers
    };

    console.log(newQuestion);

    this._quizService.addQuestion(newQuestion);

    this.reset();

  }

  isTrue(answer: string){

    let answers: string[] = ['answer1', 'answer2', 'answer3', 'answer4'];

    if ( this.addQuestion.get(answer)?.get('isTrue')?.value === false ) {

      for (let a of answers) {
        this.addQuestion.get(a)?.get('isTrue')?.patchValue(false);
      }

      this.addQuestion.get(answer)?.get('isTrue')?.patchValue(true);

    }else {

      for (let a of answers) {
        this.addQuestion.get(a)?.get('isTrue')?.patchValue(false);
      }

      this.addQuestion.get(answer)?.get('isTrue')?.patchValue(false);

    }

  }

  allFalse(){

    let answers: string[] = ['answer1', 'answer2', 'answer3', 'answer4'];
    let count = 0;

    for (let a of answers) {

      if ( this.addQuestion.get(a)?.get('isTrue')?.value === false ) {
        count++;
      }
    }

    if ( count >= 4 ) {

      return true;

    } else {

      return false;
    }
  }

  error(){

    if ( this.addQuestion.invalid ) {
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3000);

    }

    if ( this.addQuestion.valid && this.allFalse() === true ) {

      this.showError2 = true;

      setTimeout(() => {
        this.showError2 = false;
      }, 3000);
    }
  }

  reset(){
    this.addQuestion.reset();
    this.addQuestion.get('seconds')?.patchValue(10);
    this.addQuestion.get('points')?.patchValue(1000);
  }

}
