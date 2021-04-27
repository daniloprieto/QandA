import { Router } from '@angular/router';
import { ResQuizService } from './../../../services/res-quiz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { Answer } from 'src/app/models/answer';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit, OnDestroy {

  quiz!: Quiz;
  nameUser: string = '';
  indexQuestion:number = 0;
  seconds: number = 0;
  setInterval: any;
  selected: any = null;
  selectedIndex: any;
  quantityTrue: number = 0;
  quantityFalse: number = 0;
  totalpoints: number = 0;
  listAnswersUser: any[] = [];
  loading: boolean = false;

  constructor(
    private _resQuiz: ResQuizService,
    private router: Router) {}

  ngOnInit(): void {
    this.quiz = this._resQuiz.quiz;
    this.nameUser = this._resQuiz.name;

    this.validateRefresh();

    this.startCounter();
  }

  ngOnDestroy(){
    clearInterval(this.setInterval);
  }

  validateRefresh(){
    if ( this.quiz === undefined ) {
      this.router.navigate(['/']);
    }
  }

  getSeconds(): number {
    return this.seconds;
  }

  getTitle(): string {
    return this.quiz.listQuestions[this.indexQuestion].title;
  }

  startCounter(){

    this.seconds = this.quiz.listQuestions[this.indexQuestion].seconds;

    this.setInterval = setInterval( () => {

      if ( this.seconds === 0 ) {

        this.indexQuestion++;

        clearInterval(this.setInterval);

        this.startCounter();
      }

      this.seconds = this.seconds - 1;

    }, 1000);

  }

  seletedAnswer(answer: Answer, index:number){
    this.selected = answer;
    this.selectedIndex = index;
  }

  addClassOption(answer: Answer): string{
    if ( answer === this.selected ) {
      return 'selected';
    }else{
      return '';
    }
  }

  next(){
    clearInterval(this.setInterval);
    this.addAnswer();
  }

  addAnswer(){

    this.countTrueAndFalseAnswers();

    const userAnswer: any = {
      title: this.quiz.listQuestions[this.indexQuestion].title,
      points: this.getPointsAnswer(),
      seconds: this.getSecondsRemaining(),
      indexSelectedAnswer: this.getSelectedIndex(),
      listAnswers:this.quiz.listQuestions[this.indexQuestion].listAnswers
    }

    this.listAnswersUser.push(userAnswer);

    this.selected = null;
    this.selectedIndex = null;

    if ( this.quiz.listQuestions.length - 1 === this.indexQuestion ) {

      this.saveAnswersQuiz();

    }else{
      this.indexQuestion++;
      this.seconds = this.quiz.listQuestions[this.indexQuestion].seconds;
    }
  }

  getPointsAnswer(): number{

    if ( this.selected === null ) {
      return 0;
    }

    const pointsAnswer = this.quiz.listQuestions[this.indexQuestion].points;

    if ( this.selected.isTrue === true ) {

      this.totalpoints = this.totalpoints + pointsAnswer;

      return pointsAnswer;

    }else{

      return 0;

    }
  }

  getSecondsRemaining(): string{

    if ( this.selected === null ) {
      return 'he did not answer';
    }else{
      const secondsQuestion = this.quiz.listQuestions[this.indexQuestion].seconds;
      const secondsAnswer = secondsQuestion - this.seconds;

      return secondsAnswer.toString();
    }
  }

  getSelectedIndex(): any{
    if ( this.selected === null ) {

      return '';

    } else {

      return this.selectedIndex;
    }
  }

  countTrueAndFalseAnswers() {

    if ( this.selected === null ) {

      this.quantityFalse++;

      return;

    }


    if ( this.selected.isTrue === false ) {

      this.quantityFalse++;

    } else {

      this.quantityTrue++;

    }

  }

  saveAnswersQuiz(){

    const answersQuiz: any = {
      idQuiz: this.quiz.id,
      nameUser: this.nameUser,
      date: new Date(),
      quantityQuestions: this.quiz.quantityQuestions,
      quantityTrue: this.quantityTrue,
      quantityFalse: this.quantityFalse,
      totalPoints: this.totalpoints,
      listAnswersUser: this.listAnswersUser
    }

    this.loading = true;

    this._resQuiz.setAnswersUser(answersQuiz)
      .then(
        data => {

          this.router.navigate(['/play/viewResult', data.id]);

        }, error => {

          console.error(error);

          this.router.navigate(['/']);
    });

  }

}
