// select elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const clrbtn = document.getElementById("clrbtn");

// get todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// add todo
function addTodo() {

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    // create object
    const todo = {
        text: text,
        completed: false
    };

    // push into array
    todos.push(todo);

    // clear input
    input.value = "";

    saveTodos();
    renderTodos();
}

// render todos
function renderTodos() {

    // clear old html
    todoList.innerHTML = "";

    // loop through array
    todos.forEach((todo, index) => {

        // create li
        const li = document.createElement("li");

        // left section
        const leftDiv = document.createElement("div");
        leftDiv.classList.add("todo-left");

        // checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
            toggleComplete(index);
        });

        // text
        const span = document.createElement("span");
        span.textContent = todo.text;

        // completed style
        if (todo.completed) {
            span.classList.add("completed");
        }

        // append left side
        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        // action buttons
        const actions = document.createElement("div");
        actions.classList.add("actions");

        // edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", () => {
            editTodo(index);
        });

        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            deleteTodo(index);
        });

        // append buttons
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        // append to li
        li.appendChild(leftDiv);
        li.appendChild(actions);

        // append li to ul
        todoList.appendChild(li);
    });
}

// toggle complete
function toggleComplete(index) {

    todos[index].completed = !todos[index].completed;

    saveTodos();
    renderTodos();
}

// delete todo
function deleteTodo(index) {

    todos.splice(index, 1);

    saveTodos();
    renderTodos();
}

// edit todo
function editTodo(index) {

    const newText = prompt("Edit your task:", todos[index].text);

    if (newText === null) {
        return;
    }

    todos[index].text = newText.trim();

    saveTodos();
    renderTodos();
}

// save to localStorage
function saveTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));
}

// button click
addBtn.addEventListener("click", addTodo);

// enter key
input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        addTodo();
    }
});

// add event listner on clear btn
clrbtn.addEventListener("click", () => { 
todos.splice(0, todos.length);
saveTodos();
renderTodos();
});

// first render
renderTodos();