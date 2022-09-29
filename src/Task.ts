export default class Task {
  name: string;
  description: string;
  dueDate: string;
  important: boolean;
  constructor(name: string, description?: any, dueDate = "no due date", important = false){
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.important = important;
  }
}