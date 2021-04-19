import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) {
    this.recoverForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]  ]
    });
   }

  ngOnInit(): void {
  }

  recover(){
    const email = this.recoverForm.get('user')?.value;

    this.loading = true;

    this.afAuth.sendPasswordResetEmail(email).then(
      res => {
        this.toastr.info('We send you an email to reset your password', 'Reset password');
        this.router.navigate(['/login'])
      }
    ).catch(error => {
      this.toastr.error(this._errorService.error(error.code), 'Error');
      this.recoverForm.reset();
      this.loading = false;
    });

  }
}
