const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const title = document.querySelector('.js-title');
const name = title.querySelector('h4');

const USER = 'name';
const SHOW = 'showing';

function saveName(text) {
	localStorage.setItem(USER, text);
}

function handleSubmit(event) {
	event.preventDefault();
	const currentValue = input.value;
	paintName(currentValue);
	saveName(currentValue);
}

function askForName() {
	form.classList.add(SHOW);
	form.addEventListener('submit', handleSubmit);
}

function paintName(text) {
	form.classList.remove(SHOW);
	title.classList.add(SHOW);
	name.innerText = text;
}

function loadName() {
	const currentUser = localStorage.getItem(USER);
	if (currentUser === null) {
		askForName();
	} else {
		paintName(currentUser);
	}
}

loadName();
