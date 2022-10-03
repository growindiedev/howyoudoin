import {v4 as id} from "uuid"
export default class Task {
  name: string;
  description: string;
  dueDate: string;
  important: boolean;
  done: boolean;
  id: any;

  constructor(name: string, description: string, dueDate: string , important: boolean, done: boolean){
    this.id = id()
    this.name = name;
    this.description = description;
    this.dueDate = dueDate || "no due date";
    this.important = important || false;
    this.done = done
  }
}