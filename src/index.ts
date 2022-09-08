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

const removeTodoItem = () => {

}

const completeTodoItem = (e: any) => {
  e.target.classList.toggle("checked")
  e.target.nextSibling.classList.toggle("todo-item-checked");
  //alert("whoop")
}

const favoriteTodoItem = () => {

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

  let starIcon = document.createElement("span");
  starIcon.classList.add("material-icons-round", "star", "todo-btn");
  starIcon.textContent = "star_border";
  task.appendChild(starIcon)

  let cancelIcon = document.createElement("span");
  cancelIcon.classList.add("material-icons-round", "cancel", "todo-btn");
  cancelIcon.textContent = "cancel";
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

