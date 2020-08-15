const restBtn = document.querySelectorAll('.rest-time-btn');
const clock = document.querySelector('.timer');
const gauge = document.querySelector('.timer-gauge');

let time = 0;
let totalTime = 0;
let timerState = 'sleep';
let currentElement = '';

function gaugeHandle(time) {
	if (timerState === 'start') {
		gauge.classList.remove('end');
		gauge.classList.add('start');
		gauge.style.width = `${(time / totalTime) * 100}%`;
	} else {
		gauge.classList.remove('start');
		gauge.classList.add('end');
	}
}

function selectClass(target) {
	if (timerState === 'start') {
		target.classList.add('select');
		target.addEventListener('dblclick', timerStopHandle);
	} else {
		target.classList.remove('select');
		target.removeEventListener('dblclick', timerStopHandle);
	}
}

function timer() {
	if (timerState === 'start') {
		const min = Math.floor(time / 60);
		const sec = time % 60;
		clock.innerText = `${min > 0 ? `${min}min` : ``}  ${
			sec > 0 ? `${sec}sec` : ``
		}`;
		if (time < 0) {
			timerState = 'end';
		}
		time--;
	} else {
		time = 0;
		clock.innerText = `End`;
		clearInterval(interval);
	}
	selectClass(currentElement);
	gaugeHandle(time);
}

function timerStartHandle(event) {
	if (timerState !== 'start') {
		totalTime = parseInt(event.target.value);
		time = totalTime;
		timerState = 'start';
		currentElement = this;
		interval = setInterval(timer, 1000);
	} else if (timerState === 'end') {
		time = totalTime;
		timerState = 'start';
	}
}

function timerStopHandle() {
	timerState = 'end';
}

function init() {
	restBtn.forEach(function (btnAddEvent) {
		btnAddEvent.addEventListener('click', timerStartHandle);
	});
}

init();
