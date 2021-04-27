import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class ResQuizService {

  quiz!: Quiz;
  name: string = '';

  constructor(private _firestore: AngularFirestore) { }

  searchByCode(code: string): Observable<any>{
    return this._firestore.collection('quizzes', ref => ref.where('code', '==', code) ).get();
  }

  setAnswersUser(answersUser: any): Promise<any>{
    return this._firestore.collection('answers').add(answersUser);
  }

  getAnswersUser(id: string): Observable<any>{
    return this._firestore.collection('answers').doc(id).get();
  }
}
