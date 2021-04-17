import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      user: ['', [ Validators.required, Validators.email ] ],
      pass: ['', [ Validators.required, Validators.minLength(8)] ]
    });
   }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.value);
  }


}
