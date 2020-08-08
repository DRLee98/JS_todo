const todoForm = document.querySelector('.js-toDoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDo';

function paintToDo(text) {
	const li = document.createElement('li');
	const span = document.createElement('span');
	span.innerText = text;
	const delBtn = document.createElement('button');
	delBtn.innerText = 'x';
	li.appendChild(span);
	li.appendChild(delBtn);
	todoList.appendChild(li);
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = todoInput.value;
	paintToDo(currentValue);
	todoInput.value = '';
}

function loadToDos() {
	const toDo = localStorage.getItem(TODOS_LS);
	if (toDo !== null) {
	}
}

function init() {
	loadToDos();
	todoForm.addEventListener('submit', handleSubmit);
}

init();
