import "./style.scss"

const openFormBtn = document.querySelector(".open-form")
const mainView = document.querySelector(".main-view")
const todoContainer = document.querySelector(".todo-container")
const inputForm  = document.querySelector(".input-form")
const closeFormBtn = document.querySelector(".close-form")
const pushTaskBtn = document.querySelector(".push-task")
const inputElm : any = inputForm?.firstElementChild


inputForm?.remove();
const createForm = () => {
  const input = document.createElement("input")
}

const openForm  = (e: Event) => {
  openFormBtn?.remove();
  inputForm && mainView?.appendChild(inputForm);
}

const closeForm = () => {
  inputElm.value = "";
  inputForm?.remove()
  openFormBtn && mainView?.appendChild(openFormBtn);
}

const addToDoItem = () => {
  let task = document.createElement("div");
  task.classList.add("todo-item")
  task.textContent = inputElm.value
  todoContainer?.appendChild(task);
  closeForm()
}

openFormBtn?.addEventListener("click", openForm)
closeFormBtn?.addEventListener("click", closeForm)
pushTaskBtn?.addEventListener("click", addToDoItem)


