document.addEventListener("DOMContentLoaded", () => {
  //grab the elements
  const todoList = document.getElementById("todo-list");
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskBtn.addEventListener("click", () => {
    const input = todoInput.value.trim();
    if (input === "") return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask);

    todoInput.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("task-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;

    //delete task
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });

    //mark as done or vice versa
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
