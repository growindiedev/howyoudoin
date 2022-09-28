import "./style.scss"

// <div class="projects-item">
//           <span class="material-icons-round project-icon">build_circle</span>
//           <span class="project-item-text">gucci</span>
//           <span class="material-icons-round cancel">cancel</span>
// </div>

const mainView = document.querySelector(".main-view")

const todoContainer = document.querySelector(".todo-container")
const inputTaskForm  = document.querySelector(".input-form")
const openFormBtn = document.querySelector(".open-form")
const closeTaskFormBtn = document.querySelector(".close-form")
const pushTaskBtn = document.querySelector(".push-task")

const projectsContainer = document.querySelector(".projects-container")
const inputProjectForm  = document.querySelector(".project-form")
const openProjectFormBtn = document.querySelector(".open-project-form")
const closeProjectFormBtn = document.querySelector(".close-project-form")

const pushProjectBtn = document.querySelector(".push-project")
const inputElm : any = document.querySelector(".add-task-input")
const inputProjectElm : any = document.querySelector(".add-project-input")



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
  inputElm.value = "";
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

const createToDoElm = (): HTMLDivElement => {
  let task = document.createElement("div");
  task.classList.add("todo-item");

  let checkIcon = document.createElement("span");
  checkIcon.classList.add("material-icons-round", "check", "todo-btn");
  checkIcon.textContent = "check_circle";
  checkIcon.addEventListener("click", completeTodoItem)
  task.appendChild(checkIcon)

  let text = document.createElement("span");
  text.classList.add("todo-item-text");
  text.textContent = inputElm.value;
  task.appendChild(text)

  let calenderIcon = document.createElement("span");
  calenderIcon.classList.add("material-icons-round", "calender", "todo-btn");
  calenderIcon.textContent = "insert_invitation";
  //calenderIcon.addEventListener("click", removeTodoItem)
  task.appendChild(calenderIcon)

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

  return task
}

const addToDoItem = () => {
  let todo = createToDoElm();
  todoContainer?.appendChild(todo);
  closeForm();
}


// <div class="projects-item">
//           <span class="material-icons-round project-icon">build_circle</span>
//           <span class="project-item-text">gucci</span>
//           <span class="material-icons-round cancel">cancel</span>
// </div>

const createProjectElm = ():HTMLDivElement => {
  let project = document.createElement("div");
  project.classList.add("projects-item");
  
  let projectIcon = document.createElement("span");
  projectIcon.classList.add("material-icons-round", "project-icon");
  projectIcon.textContent = "build_circle";
  project.appendChild(projectIcon)

  let projectItemText = document.createElement("span");
  projectItemText.classList.add("project-item-text");
  projectItemText.textContent = inputProjectElm.value;
  project.appendChild(projectItemText);


  let cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-icons-round", "cancel", );
  cancelIcon.textContent = "cancel";
  cancelIcon.addEventListener("click", removeProjectItem);
  project.appendChild(cancelIcon)

  return project;
}


const addProjectItem = () => {
  let project = createProjectElm();
  projectsContainer?.appendChild(project);
  closeProjectForm();
}

openFormBtn?.addEventListener("click", openForm)
closeTaskFormBtn?.addEventListener("click", closeForm)
pushTaskBtn?.addEventListener("click", addToDoItem)

openProjectFormBtn?.addEventListener("click", openProjectForm);
pushProjectBtn?.addEventListener("click", addProjectItem)               
closeProjectFormBtn?.addEventListener("click", closeProjectForm);  