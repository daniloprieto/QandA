import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Question } from '../models/question';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  titleQuiz: string = '';
  descriptionQuiz: string = '';
  private question$ = new Subject<Question>();

  constructor( private _firestore: AngularFirestore) { }

  addQuestion(question: Question) {
    this.question$.next(question);
  }

  getQuestions(): Observable<Question> {
    return this.question$.asObservable();
  }

  createQuiz(quiz: Quiz): Promise<any>{
    return this._firestore.collection('quizzes').add(quiz);
  }

  getQuizByIdUser(uid: string){
    return this._firestore.collection('quizzes', ref => ref.where('uid', '==', uid) ).snapshotChanges();
  }
}
