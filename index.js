// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const todoInput = document.querySelector(".todo-input");
  const todoButton = document.querySelector(".todo-button");
  const todoList = document.querySelector(".todo-list");
  const filterOption = document.querySelector(".filter-todo");

  // Event Listeners
  todoButton.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteCheck);
  filterOption.addEventListener("change", filterTodo);

  // Add Todo
  function addTodo(event) {
    event.preventDefault();

    // Prevent empty input
    if (todoInput.value.trim() === "") return;

    // Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Complete button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear input
    todoInput.value = "";
  }

  // Delete & Complete
  function deleteCheck(e) {
    const item = e.target;

    // Handle icon clicks inside buttons
    const button = item.closest("button");
    if (!button) return;

    const todo = button.parentElement;

    // Delete
    if (button.classList.contains("trash-btn")) {
      todo.classList.add("fall");
      todo.addEventListener("transitionend", () => {
        todo.remove();
      });
    }

    // Complete
    if (button.classList.contains("complete-btn")) {
      todo.classList.toggle("completed");
    }
  }

  // Filter Todos
  function filterTodo(e) {
    const todos = todoList.children;

    Array.from(todos).forEach((todo) => {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;

        case "completed":
          todo.style.display = todo.classList.contains("completed")
            ? "flex"
            : "none";
          break;

        case "uncompleted":
          todo.style.display = !todo.classList.contains("completed")
            ? "flex"
            : "none";
          break;
      }
    });
  }
});