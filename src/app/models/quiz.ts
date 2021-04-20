import { Question } from "./question";

export class Quiz {
  id: number;
  uid: string;
  title: string;
  description: string;
  code: string;
  quantityQuestions: number;
  createdDate: Date;
  listQuestions: Question[];

  constructor(
    id: number,
    uid: string,
    title: string,
    description: string,
    code: string,
    quantityQuestions: number,
    createdDate: Date,
    listQuestions: Question[],
  ){
    this.id = id;
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.code = code;
    this.quantityQuestions = quantityQuestions;
    this.createdDate = createdDate;
    this.listQuestions = listQuestions;
  }
}
