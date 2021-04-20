import { Answer } from "./answer";

export class Question{
  title: string;
  points: number;
  seconds: number;
  listAnswers: Answer[];

  constructor(
    title: string,
    points: number,
    seconds: number,
    listAnswers: Answer[]
    ){
      this.title = title;
      this.points = points;
      this.seconds = seconds;
      this.listAnswers = listAnswers;
  }
}
