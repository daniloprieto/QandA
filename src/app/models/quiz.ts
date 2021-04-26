import { Question } from "./question";

export class Quiz {
  uid: string;
  title: string;
  description: string;
  code: string;
  quantityQuestions: number;
  createdDate: Date;
  listQuestions: Question[];

  constructor(
    uid: string,
    title: string,
    description: string,
    code: string,
    quantityQuestions: number,
    createdDate: Date,
    listQuestions: Question[],
  ){
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.code = code;
    this.quantityQuestions = quantityQuestions;
    this.createdDate = createdDate;
    this.listQuestions = listQuestions;
  }
}
