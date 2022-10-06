import "./style.scss"
import Task from "./Task"
import Project from "./Project"
import HowYouDoin from "./HowYouDoin"
import { format, isEqual } from "date-fns";
import isFuture from 'date-fns/isFuture'

const mainView = document.querySelector(".main-view")

const todoContainer = document.querySelector(".todo-container")
const inputTaskForm  = document.querySelector(".input-form")
const openTaskFormBtn = document.querySelector(".open-form")
const closeTaskFormBtn = document.querySelector(".close-form")
const pushTaskBtn = document.querySelector(".push-task")
const editTaskBtn = document.querySelector(".edit-task")

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
let howYouDoin = new HowYouDoin();
let currentProject: any = howYouDoin.projects[0]

inputTaskForm?.remove();
inputProjectForm?.remove();

const createForm = () => {
  const input = document.createElement("input")
}

const openTaskForm  = (e: any) => {
  openTaskFormBtn?.remove();
  editTaskBtn?.remove()
  let checkBtn: any = document.querySelector(".push-task")
  if(!checkBtn) {
    inputTaskForm?.appendChild(pushTaskBtn!)
  }
  mainView?.appendChild(inputTaskForm!);
}

const openEditForm = (e: any, taskObj: any) => {
  openTaskFormBtn?.remove();
  pushTaskBtn?.remove()
  let checkBtn: any = document.querySelector(".edit-task")
  if(!checkBtn) {
    inputTaskForm?.appendChild(editTaskBtn!)
  }

  inputTaskElm.value = taskObj.name;
  inputDescriptionElm.value = taskObj.description;
  inputDateElm.value = taskObj.dueDate;
  mainView?.appendChild(inputTaskForm!);
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

const removeTodoItem = (e: any, taskObj: any) => {
  let newTasks = currentProject.tasks.filter((task: { id: any }) => taskObj.id !== task.id)
  currentProject.tasks = newTasks

  let update = howYouDoin.projects.map( project => {
    let newProject = {...project}
    if(project.tasks.includes(taskObj)){
      newProject.tasks = project.tasks.filter(task => task !== taskObj)
    }
    return newProject
  })
  howYouDoin.projects = update;
  renderProjects();
  renderTasks();
}

const renderProjects = () => {
  projectsContainer!.innerHTML = "";
  const userProjects = howYouDoin.projects.slice(4);
  userProjects.forEach( (project: any) => {
    let node = createProjectElm(project)
    projectsContainer?.appendChild(node);
  })
  projectsContainer?.appendChild(openProjectFormBtn!)
}

const removeProjectItem = (e: any, projectObj: any) => {
  howYouDoin.projects = howYouDoin.projects.filter(project => projectObj.id !== project.id)
  renderProjects();
  const inbox = document.querySelector(".material-icons-round.inbox")
  projectObj.id === currentProject.id && toggleView(howYouDoin.projects[0], inbox)  
}

const completeTodoItem = (e: any, taskObj: any) => {
  taskObj.done = !taskObj.done
  taskObj.done ? e.target.classList.add("checked") : e.target.classList.remove("checked")
  e.target.nextSibling.classList.toggle("todo-item-checked");
}

const favoriteTodoItem = (e: any, taskObj: any) => {
  taskObj.important = !taskObj.important
  taskObj.important ? e.target.classList.add("starred") : e.target.classList.remove("starred")
  renderTasks();
}

const createToDoElm = (taskObj: any) => {
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
  starIcon.addEventListener("click", (e) => favoriteTodoItem(e, taskObj))
  task.appendChild(starIcon)

  let cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-icons-round", "cancel", "todo-btn");
  cancelIcon.textContent = "cancel";
  cancelIcon.addEventListener("click",(e) => removeTodoItem(e, taskObj))
  task.appendChild(cancelIcon)

  let editIcon = document.createElement("span");
  editIcon.classList.add("material-icons-round", "edit", "todo-btn");
  editIcon.textContent = "edit";
  editIcon.addEventListener("click", (e) => openEditForm(e, taskObj) )
  editTaskBtn?.addEventListener("click", (e) => editToDoItem(e, taskObj))
  task.appendChild(editIcon)

  if(taskObj.done){
    checkIcon.classList.add("checked") 
    textContainer.classList.add("todo-item-checked");
  }

  if(taskObj.important){
    starIcon.classList.add("starred")
  }
  return task;
}

const addToDoItem = (e: any) => {
 //TODO: can grab values from localstorage or firebase here
 //TODO: first we check what is the current project, then we create a task and push that task into that project.
 //TODO: RISK OF INFINITE LOOP, HAVE TO MAKE CHANGES HERE TO EDIT THE TASK
  const todo = new Task(inputTaskElm.value, inputDescriptionElm.value, inputDateElm.value, false, false);
  currentProject?.tasks.push(todo)
  renderTasks();
  closeTaskForm();
}

const editToDoItem = (e: any, taskObj: any) => {
  alert(taskObj.name)
  
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
    switch (currentProject.name.toLowerCase()) {
      case 'inbox': {
        howYouDoin.projects.forEach(project => {
          project.tasks.forEach(task => {
              let node = createToDoElm(task)
              todoContainer?.appendChild(node);
          });
        })
        break;
      }

      case 'today': {
        let today = Date.parse(format(new Date(), "yyyy-MM-dd"));           
        //parse for comparison and format so it has the same format before parsing it
        howYouDoin.projects.forEach(project => {
          project.tasks.forEach(task => {
            let date = Date.parse(task.dueDate);
            if(isEqual(date, today)){
              let node = createToDoElm(task)
              todoContainer?.appendChild(node);
            } 
          });
        });
        break;
      }
      case 'upcoming': {
        howYouDoin.projects.forEach(project => {
          project.tasks.forEach(task => {
            let date = Date.parse(task.dueDate);
            if(isFuture(date)){
              let node = createToDoElm(task)
              todoContainer?.appendChild(node);
            }
          });
        })
        
        break;
      }
      case 'star': {
        howYouDoin.projects.forEach(project => {
          project.tasks.forEach(task => {
            if(task.important) {
              let node = createToDoElm(task)
              todoContainer?.appendChild(node);
            }
          });
        })
        break;
      }
      default:{
        currentProject.tasks.forEach( (task: any) => {
          let node = createToDoElm(task)
          todoContainer?.appendChild(node);
        })  
        break;
      }
    }
}

const toggleView = (projectObj: any, projectNode: Element | undefined | null) => {
  //TODO: CAN GET OPTIONAL PARAMETER FROM createHomeProjectElm to know its a home project.
  currentProject = projectObj
  //TODO: here we can apply the logic to render tasks with filters
  selectProject(projectNode)
  renderTasks();
}

const createProjectElm = (projectObj: any) => {
  let project = document.createElement("div");
  project.classList.add("projects-item");
  project.addEventListener("click",() => toggleView(projectObj, project))
  
  let projectIcon = document.createElement("span");
  projectIcon.classList.add("material-icons-round", "project-icon");
  projectIcon.textContent = "checklist";

  project.appendChild(projectIcon)

  let projectItemText = document.createElement("span");
  projectItemText.classList.add("project-item-text");
  projectItemText.textContent = projectObj.name;

  project.appendChild(projectItemText);

  let cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-icons-round", "cancel", );
  cancelIcon.textContent = "cancel";
  cancelIcon.addEventListener("click", (e) => {
    e.stopPropagation()
    removeProjectItem(e, projectObj)
  });
  project.appendChild(cancelIcon)
  projectsContainer?.appendChild(project);
  return project
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

const loadAllProjects = () => {
  //TODO: abilty to differ Home projects from User projects.
  projectsContainer!.innerHTML = "";
  homeProjectsContainer!.innerHTML = "";
  const homeProjects = howYouDoin.projects.slice(0, 4);
  const userProjects = howYouDoin.projects.slice(4);
  homeProjects.forEach( project => {
    createHomeProjectElm(project)
  })

  userProjects.forEach(project => {
    createProjectElm(project)
  })
  projectsContainer?.appendChild(openProjectFormBtn!)
}

loadAllProjects();
openTaskFormBtn?.addEventListener("click", openTaskForm)
closeTaskFormBtn?.addEventListener("click", closeTaskForm)
pushTaskBtn?.addEventListener("click", addToDoItem)

openProjectFormBtn?.addEventListener("click", openProjectForm);
pushProjectBtn?.addEventListener("click", addProjectItem)               
closeProjectFormBtn?.addEventListener("click", closeProjectForm);  