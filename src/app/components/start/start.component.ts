import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public error: boolean = false;
  public pin: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ingress(){
    if (this.pin === '') {
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 3000);
    }else{
      this.error = false;
    }
  }

}
