import "./style.scss"


let mainView = document.querySelector(".main-view")

const addTask  = (e: Event) => {
  let task = document.createElement("div");
  task.textContent = "testing tasks"
  mainView?.appendChild(task)
}

//problem 1
let addBtn = document.querySelector(".add-task")
addBtn?.addEventListener("click", addTask)



