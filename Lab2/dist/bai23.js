"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndFilterTodos = fetchAndFilterTodos;
// Write an async function that fetches a list of todos and filters out those that are not completed.
async function fetchAndFilterTodos() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        const completedTodos = todos.filter((todo) => todo.completed);
        console.log("Completed todos:", completedTodos);
    }
    catch (error) {
        console.error("Error fetching and filtering todos:", error);
    }
}
