import {v4 as id} from "uuid"
import date from "date-fns"
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

  getDateFormatted() {
    const day = this.dueDate.split('-')[2]
    const month = this.dueDate.split('-')[1]
    const year = this.dueDate.split('-')[0]

    //return `${month}/${day}/${year}`
    return `${day}/${month}/${year}`

  }
}