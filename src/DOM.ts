export const createSignInUI = (eventListener:  any) => {
  let div = document.createElement("div");
  div.classList.add("login-component")

  let button = document.createElement("button");
  button.classList.add("sign-in-btn")
  button.textContent = "Log In with Google"
  button.addEventListener("click", eventListener)
  div.appendChild(button);

  return div;
}

export const createSidebar = () => {


  let sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  sidebar.innerHTML =  
  `<div class="home-heading">Home</div>
  <div class="home-container">
  </div>
  <div class="projects-heading">Projects</div>
  <div class="projects-container">
    <button class="open-project-form" onclick='openProjectForm()'>Add Project</button>
  </div>`

  return sidebar
}

export const createMainView = () => {
  let mainView = document.createElement("div");
  mainView.classList.add("main-view");
  mainView.innerHTML =
  `<div class="header-container">
      <h2 class="project-heading">Inbox</h2>
    </div>
      <div class="todo-container"></div>
    <button class="open-form">Add task</button>
  </div>`

  return mainView;
}

export const createInputForm = () => {
  let inputForm = document.createElement("div");
  inputForm.classList.add("input-form");

  inputForm.innerHTML =
  `<input type="text" name="add-desc-input" class="add-task-input" placeholder="Task name">
  <input type="date" class="add-date-input" placeholder="deadline">
  <textarea name="description" class="add-desc-input" row="5" cols="33" placeholder="task description.. (optional)"></textarea>
  <button class="close-form">Cancel</button>
  <button class="push-task">Add</button>
  <button class="edit-task">Update</button>`

  return inputForm
}


export const createProjectForm = () => {
  let ProjectForm = document.createElement("div");
  ProjectForm.classList.add("project-form");
  ProjectForm.innerHTML =
  `<input type="text" class="add-project-input" placeholder="eg. Buy Milk">
  <button class="push-project">Add</button>
  <button class="close-project-form">Cancel</button>`
  return ProjectForm
}




