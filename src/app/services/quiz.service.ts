import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  titleQuiz: string = '';
  descriptionQuiz: string = '';
  private question$ = new Subject<Question>();

  constructor() { }

  addQuestion(question: Question) {
    this.question$.next(question);
  }

  getQuestions(): Observable<Question> {
    return this.question$.asObservable();
  }
}
