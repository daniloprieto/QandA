import { User } from './../../../models/user';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from './../../../services/error.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', [ Validators.required, Validators.email ] ],
      pass: ['', [ Validators.required, Validators.minLength(8)] ]
    });
   }

  ngOnInit(): void {
  }

  login(){
    const user = this.loginForm.get('user')?.value;
    const pass = this.loginForm.get('pass')?.value;

    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(user, pass).then(
      res => {
        if ( res.user?.emailVerified === false ) {
          this.router.navigate(['/user/verifyEmail']);
        } else {
          this.setLocalStorage(res.user);
          this.router.navigate(['/dashboard']);
        }
      }).catch(error => {
        console.error(error);
        this.loading = false;
        this.toastr.error( this._errorService.error(error.code), 'Error');
      })
  }

  setLocalStorage(data: any) {
    const user: User = {
      uid: data.uid,
      email: data.email
    }

    localStorage.setItem('user', JSON.stringify(user));
  }


}
