const mode = document.querySelector('.mode-change');
const routineBox = document.querySelector('.routine-box');
const openBtn = document.querySelector('.open-btn');
const closeBtn = document.querySelector('.close-btn');

let modeState = 'read';

function modeHandle() {
	if (modeState === 'read') {
		routineBox.classList.add('write');
		mode.innerText = 'Write Mode';
		modeState = 'write';
	} else {
		routineBox.classList.remove('write');
		mode.innerText = 'Read Mode';
		modeState = 'read';
	}
}

function routineUp() {
	routineBox.classList.add('open');
}

function routineDown() {
	routineBox.classList.remove('open');
}

function init() {
	mode.addEventListener('click', modeHandle);
	openBtn.addEventListener('click', routineUp);
	closeBtn.addEventListener('click', routineDown);
}

init();
