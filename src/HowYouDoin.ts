import Project from "./Project"

export default class HowYouDoin {
    projects: {name: string, tasks: any[]}[]
    constructor() {
      this.projects = []
      this.projects.push(new Project('All Tasks'))
      this.projects.push(new Project('Today'))
      this.projects.push(new Project('Upcoming'))
      this.projects.push(new Project('Favourites'))
    }
} 
