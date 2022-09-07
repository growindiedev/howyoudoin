import "./style.scss"

let addBtn = document.querySelector(".add-task")
let mainView = document.querySelector(".main-view")
let todoContainer = document.querySelector(".todo-container")
let inputForm  = document.querySelector(".input-form")!
inputForm?.remove();

const createForm = () => {
  const input = document.createElement("input")
  
}

const addTask  = (e: Event) => {
  // let task = document.createElement("div");
  // task.classList.add("todo-item")
  // task.textContent = "testing tasks"
  addBtn?.remove();
  mainView?.appendChild(inputForm);
}


const removeTask = (e: Event) => {

}

//problem 1
addBtn?.addEventListener("click", addTask)



