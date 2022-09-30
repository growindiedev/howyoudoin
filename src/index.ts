import "./style.scss"
import Task from "./Task"
import Project from "./Project"
import HowYouDoin from "./HowYouDoin"

const mainView = document.querySelector(".main-view")

const todoContainer = document.querySelector(".todo-container")
const inputTaskForm  = document.querySelector(".input-form")
const openFormBtn = document.querySelector(".open-form")
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
const howYouDoin = new HowYouDoin();


inputTaskForm?.remove();
inputProjectForm?.remove();

const createForm = () => {
  const input = document.createElement("input")
}

const openForm  = (e: Event) => {
  openFormBtn?.remove();
  inputTaskForm && mainView?.appendChild(inputTaskForm);
}
  
const openProjectForm  = (e: Event) => {
  openProjectFormBtn?.remove();
  inputProjectForm && projectsContainer?.appendChild(inputProjectForm);
}

const closeForm = () => {
  inputTaskElm.value = "";
  inputDescriptionElm.value = "";
  inputDateElm.value = "";

  inputTaskForm?.remove()
  openFormBtn && mainView?.appendChild(openFormBtn);
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

const completeTodoItem = (e: any) => {
  e.target.classList.toggle("checked")
  e.target.nextSibling.classList.toggle("todo-item-checked");
}

const favoriteTodoItem = (e: any) => {
  e.target.classList.toggle("starred")
}

const createToDoElm = (taskObj: any) => {
  let task = document.createElement("div");
  task.classList.add("todo-item");

  let checkIcon = document.createElement("span");
  checkIcon.classList.add("material-icons-round", "check", "todo-btn");
  checkIcon.textContent = "check_circle";
  checkIcon.addEventListener("click", completeTodoItem)
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

  todoContainer?.appendChild(task)
}

const addToDoItem = () => {
 //TODO: can grab values from localstorage or firebase here
 //TODO: first we check what is the current project, then we create a task and push that task into that project.
  const todo = new Task(inputTaskElm.value, inputDescriptionElm.value, inputDateElm.value, false);
  createToDoElm(todo);
  closeForm();
}


const createProjectElm = (projectObj: any) => {
  let project = document.createElement("div");
  project.classList.add("projects-item");
  
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

const createHomeProjectElm = (ProjectObj: any) => {

  // <div class="home-item">
  //         <span class="material-icons-round today">today</span>
  //         <span class="home-item-text">Today</span>
  //       </div>
  let project = document.createElement("div");
  project.classList.add("home-item");

  let projectIcon = document.createElement("span");
  projectIcon.classList.add("material-icons-round", ProjectObj.name);
  projectIcon.textContent = ProjectObj.name;
  project.appendChild(projectIcon)

  let projectItemText = document.createElement("span");
  projectItemText.classList.add("home-item-text");
  projectItemText.textContent = ProjectObj.name;
  project.appendChild(projectItemText);

  homeProjectsContainer?.appendChild(project)

}


const addProjectItem = () => {
  //TODO: here is where we need to add tasks with the projects
  //localStorage.setItem("howYouDoin", JSON.stringify(howYouDoin)); 
  //TODO: a brand new howyoudoin instance is being created on every new user account and thier projects 
  // are being saved in localStorage or firestore.
  const project = new Project(inputProjectElm.value);
  howYouDoin.projects.push(project);

  createProjectElm(project);
  closeProjectForm();
}

const loadProjects = () => {
  //TODO: abilty to differ Home projects from User projects.
  howYouDoin.projects.forEach( project => {
    createHomeProjectElm(project)
  })
}

const loadTasks = () => {
  
}


loadProjects();
openFormBtn?.addEventListener("click", openForm)
closeTaskFormBtn?.addEventListener("click", closeForm)
pushTaskBtn?.addEventListener("click", addToDoItem)

openProjectFormBtn?.addEventListener("click", openProjectForm);
pushProjectBtn?.addEventListener("click", addProjectItem)               
closeProjectFormBtn?.addEventListener("click", closeProjectForm);  