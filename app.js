//Selectors
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.todo-button');
const filterOption = document.querySelector('.filter-todo');

//Event listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
	event.preventDefault();
	//Create Todo div
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//Create Li
	const newTodo = document.createElement('li');
	newTodo.innerText = todoInput.value;
	newTodo.classList.add('todo-item');
	todoDiv.appendChild(newTodo);
	
	//Check mark button
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//Check trash button
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);

	//Append To list
	todoList.appendChild(todoDiv);

	//Clear Todo Input value
	todoInput.value = '';
}

function deleteCheck(e) {
	const item = e.target;
	//Delete Todo
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
        todo.classList.add('fall');
        
		setTimeout(() => {
			todo.remove();
		}, 500);
	}

	//Check Mark
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	console.log(todos.style);
	console.log(e.target.value);
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) todo.style.display = 'flex';
				else todo.style.display = 'none';
				break;
			case 'incompleted':
				if (!todo.classList.contains('completed')) todo.style.display = 'flex';
				else todo.style.display = 'none';
				break;
		}
	});
}
