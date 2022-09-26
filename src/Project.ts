export default class Project {
  name: string;
  tasks: any[];
  constructor(name: string){
    this.name = name;
    this.tasks = [];
  }
}