import { ErrorService } from './../../../services/error.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService
    ) {
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
    const user = this.registerForm.get('user')?.value;
    const pass = this.registerForm.get('pass')?.value;

    this.loading = true;

    this.afAuth.createUserWithEmailAndPassword(user,pass).then(
      res => {
        res.user?.sendEmailVerification();
        this.toastr.success('We send you an email to verify your email address', 'The user was registered successfully!');
        this.router.navigate(['/user']);
    }).catch(error => {
      console.error(error);
      this.registerForm.reset();
      this.loading = false;
      this.toastr.error( this._errorService.error(error.code), 'Error!');
    })

  }

  checkPassword(group: FormGroup){
    const pass = group.controls.pass?.value;
    const passrepeat = group.controls.passrepeat?.value;

    return pass === passrepeat ? null :  { notSame: true }
  }

}
