import {v4 as id} from "uuid"
export default class Project {
  name: string;
  tasks: any[];
  id: string;
  constructor(name: string){
    this.id = id()
    this.name = name;
    this.tasks = [];
  }
}