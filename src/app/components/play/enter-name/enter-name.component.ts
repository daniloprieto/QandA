import { Router } from '@angular/router';
import { ResQuizService } from './../../../services/res-quiz.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.component.html',
  styleUrls: ['./enter-name.component.scss']
})
export class EnterNameComponent implements OnInit {
  public name: string = '';
  error: boolean = false;

  constructor(
    private _resQuiz: ResQuizService,
    private router: Router) { }

  ngOnInit(): void {
    this.validateRefresh();
  }

  validateRefresh(){
    if ( this._resQuiz.quiz === undefined ) {
      this.router.navigate(['/']);
    }
  }

  saveName(){

    if ( this.name !== '' && this.name.length > 1 ) {

      this._resQuiz.name = this.name;

      this.router.navigate(['/play/initialCounter']);
    }else{

      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 3000);

    }


  }

}
