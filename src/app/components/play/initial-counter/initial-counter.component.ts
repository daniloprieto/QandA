import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-initial-counter',
  templateUrl: './initial-counter.component.html',
  styleUrls: ['./initial-counter.component.scss']
})
export class InitialCounterComponent implements OnInit, OnDestroy {

  counter:number | string = 3;
  setInterval: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.playInitialCounter();
  }

  ngOnDestroy(){
    clearInterval(this.setInterval);
  }

  playInitialCounter(){

    this.setInterval = setInterval( () => {

      if ( this.counter === 0 ){

          this.counter = 'Start';

      }else if ( isNaN( Number(this.counter) ) ){

        this.router.navigate(['/play/takeQuiz']);

      }else{

        this.counter = Number(this.counter) - 1;
      }

    }, 1000);

  }

}
