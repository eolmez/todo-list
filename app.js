// Variables

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const dropDown = document.querySelector(".dropdown");

// Event listeners

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkndelete);
dropDown.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions

function addTodo(e) {
    // Stop the refreshing 
    e.preventDefault();
    // Dom structure for add todos
    // Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo);
    newTodo.innerText = todoInput.value;
    // Add todos to local
    saveToLocal(todoInput.value);
    // Check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class = 'fas fa-check'></i>";
    checkButton.classList.add("check-btn");
    todoDiv.appendChild(checkButton);
    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='far fa-trash-alt'></i>";
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // Add to list
    todoList.appendChild(todoDiv);
    // Clear the input's value
    todoInput.value = "";
}

// Function for check and delete buttons

function checkndelete(e) {
    const item = e.target;
    const todo = item.parentElement;
    // Check button
    if (item.classList[0] === "check-btn") {
        todo.classList.toggle("checked");
    }
    // Delete button
    if (item.classList[0] === "delete-btn") {
        todo.remove();
        deleteLocalTodos(todo);
    }
}



// Dropdown menu

function filterTodo(e) {
    e.preventDefault();
    const todos = document.querySelectorAll(".todo");
    let btnText = document.getElementsByClassName("drop-btn");
    todos.forEach(function (todo) {
        switch (e.target.className) {
            case "all":
                todo.style.display = "flex";
                btnText.innerHTML = "All"
                break;
            case "done":
            if (todo.classList.contains("checked")){
                todo.style.display = "flex"
            } else {
                todo.style.display = "none";
            }
                break;
            case "undone":
            if (!todo.classList.contains("checked")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
                break;
        }
    })
}

// Saving to local storage

function saveToLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Calling todos from local storage

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        // Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Li
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo);
        newTodo.innerText = todo;
        // Check button
        const checkButton = document.createElement("button");
        checkButton.innerHTML = "<i class = 'fas fa-check'></i>";
        checkButton.classList.add("check-btn");
        todoDiv.appendChild(checkButton);
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='far fa-trash-alt'></i>";
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        // Add to list
        todoList.appendChild(todoDiv);
    })
}

function deleteLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}