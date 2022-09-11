import "./style.scss"

const openFormBtn = document.querySelector(".open-form")
const mainView = document.querySelector(".main-view")
const todoContainer = document.querySelector(".todo-container")
const inputForm  = document.querySelector(".input-form")
const closeFormBtn = document.querySelector(".close-form")
const pushTaskBtn = document.querySelector(".push-task")
const todoItems = document.querySelectorAll("todo-items")

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

const removeTodoItem = (e: any) => {
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
  task.classList.add("todo-items");

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
  calenderIcon.addEventListener("click", removeTodoItem)
  task.appendChild(calenderIcon)

  let starIcon = document.createElement("span");
  starIcon.classList.add("material-icons-round", "star", "todo-btn");
  starIcon.textContent = "star_border";
  starIcon.addEventListener("click", favoriteTodoItem)
  task.appendChild(starIcon)

  let cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-icons-round", "cancel", "todo-btn");
  cancelIcon.textContent = "highlight_off";
  cancelIcon.addEventListener("click", removeTodoItem)
  task.appendChild(cancelIcon)

  return task
}

const addToDoItem = () => {
  let todo = createToDoElm();
  todoContainer?.appendChild(todo);
  closeForm();
}

openFormBtn?.addEventListener("click", openForm)
closeFormBtn?.addEventListener("click", closeForm)
pushTaskBtn?.addEventListener("click", addToDoItem)

todoItems.forEach((item: any) => {
  item.array.forEach((element: any) => {
    console.log("jus checking", element);
  });
})

