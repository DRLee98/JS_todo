const todoForm = document.querySelector('.js-toDoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDo';

let toDos = [];

function deleteToDo(event) {
	const btn = event.target;
	const li = btn.parentNode;
	todoList.removeChild(li);
	const cleanToDos = toDos.filter(function (toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
	const li = document.createElement('li');
	const span = document.createElement('span');
	span.innerText = text;
	const delBtn = document.createElement('button');
	delBtn.innerText = 'x';
	delBtn.addEventListener('click', deleteToDo);
	const newId = toDos.length + 1;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id = newId;
	todoList.appendChild(li);
	const toDoObj = {
		text: text,
		id: newId,
	};
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = todoInput.value;
	paintToDo(currentValue);
	todoInput.value = '';
}

function loadToDos() {
	const loadedToDos = localStorage.getItem(TODOS_LS);
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos);
		parsedToDos.forEach(function (toDo) {
			paintToDo(toDo.text);
		});
	}
}

function init() {
	loadToDos();
	todoForm.addEventListener('submit', handleSubmit);
}

init();
