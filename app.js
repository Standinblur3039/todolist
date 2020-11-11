//Selectors
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.todo-button');

//Event listeners
todoButton.addEventListener('click', addTodo);

//Functions
function addTodo(event){
    event.preventDefault();
    //Create Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText= 'hey';
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i className="fas fa-check"></i>';
    completedButton.classList.add(complete-btn);
    todoDiv.appendChild(completedButton);
}