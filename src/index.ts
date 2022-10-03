import "./style.scss"
import Task from "./Task"
import Project from "./Project"
import HowYouDoin from "./HowYouDoin"

const mainView = document.querySelector(".main-view")

const todoContainer = document.querySelector(".todo-container")
const inputTaskForm  = document.querySelector(".input-form")
const openTaskFormBtn = document.querySelector(".open-form")
const closeTaskFormBtn = document.querySelector(".close-form")
const pushTaskBtn = document.querySelector(".push-task")

const projectsContainer = document.querySelector(".projects-container")
const homeProjectsContainer = document.querySelector(".home-container")
const inputProjectForm  = document.querySelector(".project-form")
const openProjectFormBtn = document.querySelector(".open-project-form")
const closeProjectFormBtn = document.querySelector(".close-project-form")
const pushProjectBtn = document.querySelector(".push-project")
const inputProjectElm : any = document.querySelector(".add-project-input")

const inputTaskElm : any = document.querySelector(".add-task-input")
const inputDescriptionElm : any = document.querySelector(".add-desc-input")
const inputDateElm : any = document.querySelector(".add-date-input")

//TODO: state management should happen inside howYouDoin class!
const howYouDoin = new HowYouDoin();
let currentProject: {
  name: string;
  tasks: any[] 
} = howYouDoin.projects[0]

inputTaskForm?.remove();
inputProjectForm?.remove();

const createForm = () => {
  const input = document.createElement("input")
}

const openTaskForm  = (e: Event) => {
  openTaskFormBtn?.remove();
  inputTaskForm && mainView?.appendChild(inputTaskForm);
}
  
const openProjectForm  = (e: Event) => {
  openProjectFormBtn?.remove();
  inputProjectForm && projectsContainer?.appendChild(inputProjectForm);
}

const closeTaskForm = () => {
  inputTaskElm.value = "";
  inputDescriptionElm.value = "";
  inputDateElm.value = "";

  inputTaskForm?.remove()
  openTaskFormBtn && mainView?.appendChild(openTaskFormBtn);
}

const closeProjectForm = () => {
  inputProjectElm.value = "";
  inputProjectForm?.remove()
  openProjectFormBtn && projectsContainer?.appendChild(openProjectFormBtn);
}

const removeTodoItem = (e: any) => {
  e.target.parentNode.remove()
}

const removeProjectItem = (e: any) => {
  e.target.parentNode.remove()
}

const completeTodoItem = (e: any, taskObj: any) => {
  taskObj.done = !taskObj.done
  taskObj.done ? e.target.classList.add("checked") : e.target.classList.remove("checked")
  e.target.nextSibling.classList.toggle("todo-item-checked");
}

const favoriteTodoItem = (e: any) => {
  e.target.classList.toggle("starred")
}

const createToDoElm = (taskObj: any) => {
  //TODO: conditionally render the todos w.r.t current project
  // TODO: need to take tasks from current projects

  console.log("render", taskObj)

  let task = document.createElement("div");
  task.classList.add("todo-item");

  let checkIcon = document.createElement("span");
  checkIcon.classList.add("material-icons-round", "check", "todo-btn");
  checkIcon.textContent = "check_circle";
  checkIcon.addEventListener("click",(e) => completeTodoItem(e, taskObj))
  task.appendChild(checkIcon)

  let textContainer = document.createElement("span");
  textContainer.classList.add("todo-item-text-container"); 

  let text = document.createElement("div");
  text.classList.add("todo-item-text");
  text.textContent = taskObj.name;
  textContainer.appendChild(text)

  let description = document.createElement("div");
  description.classList.add("todo-item-desc");
  description.textContent = taskObj.description
  textContainer.appendChild(description)

  task.appendChild(textContainer);

  let calendarText = document.createElement("span");
  calendarText.classList.add("calendar", "todo-btn");
  calendarText.textContent = taskObj.dueDate;
  task.appendChild(calendarText)

  let starIcon = document.createElement("span");
  starIcon.classList.add("material-icons-round", "star", "todo-btn");
  starIcon.textContent = "star_border";
  starIcon.addEventListener("click", favoriteTodoItem)
  task.appendChild(starIcon)

  let cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-icons-round", "cancel", "todo-btn");
  cancelIcon.textContent = "cancel";
  cancelIcon.addEventListener("click", removeTodoItem)
  task.appendChild(cancelIcon)

  if(taskObj.done){
    checkIcon.classList.add("checked") 
    textContainer.classList.add("todo-item-checked");
  }
  return task;
}

const addToDoItem = () => {
 //TODO: can grab values from localstorage or firebase here
 //TODO: first we check what is the current project, then we create a task and push that task into that project.
  const todo = new Task(inputTaskElm.value, inputDescriptionElm.value, inputDateElm.value, false, false);
  currentProject?.tasks.push(todo)
  console.dir(currentProject)
  console.dir( howYouDoin)
  renderTasks();
  closeTaskForm();
}

const selectProject = (node: any) => {
  const selectedTile = document.querySelector(".selected-project");   
  selectedTile?.classList.remove("selected-project");                  
  node.classList.add("selected-project");                             
}

const renderTasks = () => {
  document.querySelector(".project-heading")!.textContent = currentProject.name;
  todoContainer!.innerHTML = "";
  currentProject.tasks.forEach( task => {
    let node = createToDoElm(task)
    todoContainer?.appendChild(node);
  })
    console.log("render", currentProject)
}

const toggleView = (projectObj: any, projectNode: HTMLDivElement | undefined) => {
  currentProject = projectObj
  selectProject(projectNode)
  renderTasks();
  console.log("toggle", currentProject)
}


const createProjectElm = (projectObj: any) => {
  let project = document.createElement("div");
  project.classList.add("projects-item");

  project.addEventListener("click",() => toggleView(projectObj, project))
  
  let projectIcon = document.createElement("span");
  projectIcon.classList.add("material-icons-round", "project-icon");
  projectIcon.textContent = "build_circle";
  project.appendChild(projectIcon)

  let projectItemText = document.createElement("span");
  projectItemText.classList.add("project-item-text");
  projectItemText.textContent = projectObj.name;
  project.appendChild(projectItemText);

  let cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-icons-round", "cancel", );
  cancelIcon.textContent = "cancel";
  cancelIcon.addEventListener("click", removeProjectItem);
  project.appendChild(cancelIcon)
  projectsContainer?.appendChild(project);
}

const createHomeProjectElm = (projectObj: any) => {
  let project = document.createElement("div");
  project.classList.add("home-item");
  project.addEventListener("click",() => toggleView(projectObj, project))

  let projectIcon = document.createElement("span");
  projectIcon.classList.add("material-icons-round", projectObj.name);
  projectIcon.textContent = projectObj.name;
  project.appendChild(projectIcon)

  let projectItemText = document.createElement("span");
  projectItemText.classList.add("home-item-text");
  projectItemText.textContent = projectObj.name;
  project.appendChild(projectItemText);

  homeProjectsContainer?.appendChild(project)
}


const addProjectItem = () => {
  //TODO: here is where we need to add tasks with the projects
  //TODO: a brand new howyoudoin instance is being created on every new user account and thier projects 
  // are being saved in localStorage or firestore.
  const project = new Project(inputProjectElm.value);
  howYouDoin.projects.push(project);
  createProjectElm(project);
  closeProjectForm();
}

const loadProjects = () => {
  //TODO: abilty to differ Home projects from User projects.
  const homeProjects = howYouDoin.projects.slice(0, 4);
  const userProjects = howYouDoin.projects.slice(4);
  homeProjects.forEach( project => {
    createHomeProjectElm(project)
  })

  userProjects.forEach(project => {
    createProjectElm(project)
  })
}

const loadTasks = () => {
  
}


loadProjects();
openTaskFormBtn?.addEventListener("click", openTaskForm)
closeTaskFormBtn?.addEventListener("click", closeTaskForm)
pushTaskBtn?.addEventListener("click", addToDoItem)

openProjectFormBtn?.addEventListener("click", openProjectForm);
pushProjectBtn?.addEventListener("click", addProjectItem)               
closeProjectFormBtn?.addEventListener("click", closeProjectForm);  