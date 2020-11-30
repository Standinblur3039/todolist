const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const todoForm = document.querySelector('.todo-form');
const filterOption = document.querySelector('.filter-todo');
const deleteAllTasks= document.querySelector('.delete-all-container');
const deleteAllBtn= document.querySelector('.delete-all-trash-btn')

const LOCAL_STORAGE_TODO_KEY = 'task.todos';
const LOCAL_STORAGE_COMPLETED_TODO_ID_KEY = 'task.completedTodos';
let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) || [];
let completedTodoId = localStorage.getItem(LOCAL_STORAGE_COMPLETED_TODO_ID_KEY);

todoForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const todoName = todoInput.value;
	if (todoName == null || todoName === '') return;
	const todo = createTodo(todoName);
	todoInput.value = null;
	todos.push(todo);
	saveAndRender();
});

function createTodo(name) {
	return { id: Date.now().toString(), name: name, status: false };
}

function saveAndRender() {
	save();
	render();
}

function save() {
	localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todos));
	localStorage.setItem(LOCAL_STORAGE_COMPLETED_TODO_ID_KEY, completedTodoId);
}
function render() {
	var check=0;
	clearElement(todoList);
	clearElement(deleteAllTasks)
	todos.forEach((todo) => {
		renderTasks(todo);
		if(todo.status)
		check=1;
	});
	if(check==1)
	clearCompletedbtn()
	if(todos[0] == null)
	clearElement(deleteAllTasks)
	if(todos[0] != null)
	deleteAllTasksbtn()
}
function renderCompleted(){
	var check=0;
	clearElement(todoList);
	clearElement(deleteAllTasks);
    todos.forEach((todo) => {
        if(todo.status)
        {
			renderTasks(todo);
			check=1;
		}
	})
	if(check==1)
	clearCompletedbtn()
	if(todos[0] == null)
	clearElement(deleteAllTasks)
	if(todos[0] != null)
	deleteAllTasksbtn()
}
function renderIncomplete(){
	clearElement(todoList);
	clearElement(deleteAllTasks)
    todos.forEach((todo) => {
        if(!todo.status)
        {
			renderTasks(todo);
		}
	})
	if(todos[0] == null)
	clearElement(deleteAllTasks)
	if(todos[0] != null)
	deleteAllTasksbtn()
}

function renderTasks(todo){
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	const todoElement = document.createElement('li');
	todoElement.dataset.listId = todo.id;
	todoElement.dataset.status = todo.status;
	todoElement.classList.add('todo-item');
	todoElement.innerText = todo.name;
	todoDiv.appendChild(todoElement);
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
	trashButton.classList.add('trash-btn');
	if (todo.status) {
		todoElement.classList.toggle('completed');
	}
	todoDiv.appendChild(trashButton);
	todoList.appendChild(todoDiv);
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

todoList.addEventListener('click', (e) => {
	const item = e.target;
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		todo.classList.add('fall');
		const todoIndex = todo.children[0].innerText;
		todos.splice(todos.indexOf(todoIndex), 1);
		setTimeout(() => {
			todo.remove();
			saveAndRender();
		}, 500);
	}
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
		completedTodoId = todo.children[0].dataset.listId;
		todos.forEach((todo) => {
			if (todo.id === completedTodoId){ todo.status = todo.status ? false : true;

			}
		});
		
		saveAndRender();
	}
});

filterOption.addEventListener('click', (e) => {
	const todos = todoList.childNodes;
	switch (e.target.value) {
		case 'all':
			render();
			break;
		case 'completed':
			renderCompleted();
			break;
		case 'incompleted':
			renderIncomplete();
			break;
		default: render();
	}
});

deleteAllTasks.addEventListener('click', (e) => {
	const item = e.target;
	if (item.classList[0] === 'delete-all-trash-btn') {
		todos=[];
		clearElement(deleteAllTasks);
		saveAndRender()
	}
	if (item.classList[0] === 'clear-completed-btn'){
		todos= todos.filter(todo=>{
			return todo.status != true;
		})
		saveAndRender();
	}
})



function deleteAllTasksbtn(){
	const deleteAlltrashButton = document.createElement('button');
	deleteAlltrashButton.innerHTML = 'Delete All Tasks';
	deleteAlltrashButton.classList.add('delete-all-trash-btn');
	deleteAllTasks.appendChild(deleteAlltrashButton)
}

function clearCompletedbtn(){
	const clearCompletedButton = document.createElement('button');
	clearCompletedButton.innerHTML = 'Clear Completed';
	clearCompletedButton.classList.add('clear-completed-btn');
	deleteAllTasks.appendChild(clearCompletedButton)
}

render();
