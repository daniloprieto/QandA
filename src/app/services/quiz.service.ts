import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  titleQuiz: string = '';
  descriptionQuiz: string = '';

  constructor() { }
}
