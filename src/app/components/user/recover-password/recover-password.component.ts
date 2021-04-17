import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.recoverForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]  ]
    });
   }

  ngOnInit(): void {
  }

  recover(){

  }
}
