//Selectors
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.todo-button');

//Event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

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
	//clearing Todo input
	todoInput.value = "";
}

function deleteCheck(e){
	const item = e.target;
	//delete todo
	if(item.classList[0] === 'trash-btn'){
		const todo = item.parentElement;
		//animation
		todo.classList.add('fall');
		todo.addEventListener('transitionend',function(){
			todo.remove();
		});
	}

	//check mark
	if(item.classList[0] === 'complete-btn'){
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}
