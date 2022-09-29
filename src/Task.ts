export default class Task {
  name: string;
  description: string;
  dueDate: string;
  important: boolean;
  constructor(name: string, description: string, dueDate: string , important : boolean){
    this.name = name;
    this.description = description;
    this.dueDate = dueDate || "no due date";
    this.important = important;
  }
}