const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js-greetings');

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
	greeting.classList.add(SHOW);
	greeting.innerText = `Hi ${text}`;
}

function loadName() {
	const currentUser = localStorage.getItem(USER);
	if (currentUser === null) {
		askForName();
	} else {
		paintName(currentUser);
	}
}
