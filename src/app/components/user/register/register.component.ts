import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required, Validators.email] ],
      pass: ['', [Validators.required, Validators.minLength(8) ] ],
      passrepeat: ['']
    }, {
      validators: this.checkPassword
    });
  }

  ngOnInit(): void {
  }

  register(){

  }

  checkPassword(group: FormGroup){
    const pass = group.controls.pass?.value;
    const passrepeat = group.controls.passrepeat?.value;

    return pass === passrepeat ? null :  { notSame: true }
  }

}
