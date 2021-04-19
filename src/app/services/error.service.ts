import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code: string): string {

    switch (code) {
      case 'auth/email-already-in-use':
        return 'email already in use'
        break;
      case 'auth/invalid-email':
        return 'Invalid email';
        break;
      case 'auth/weak-password':
        return 'Weak password';
        break;
      case 'auth/user-not-found':
        return 'User not found';
        break;
      case 'auth/wrong-password':
        return 'Invalid password';
        break;
      default:
        return 'unknow error';
        break;
    }
  }
}
