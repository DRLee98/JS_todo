const routineForm = document.querySelector('.add-routine');
const table = document.querySelector('.routine');
const dayBtn = document.querySelectorAll('.day-btn');
const space = document.querySelector('.space');

let routine = [];
let selectDay = '';
const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function getToday() {
	const date = new Date();
	const today = date.getDay();
	selectDay = day[today];
}

function deleteList(event) {
	const delTarget = event.target.parentNode;
	const reviseList = routine.filter(function (data) {
		return data.id !== delTarget.id;
	});
	table.removeChild(delTarget);
	routine = reviseList;
	saveRoutine();
}

function writeList(Obj) {
	if (Obj) {
		const tr = document.createElement('tr');
		const nameTd = document.createElement('td');
		const repsTd = document.createElement('td');
		const setTd = document.createElement('td');
		const restTimeTd = document.createElement('td');
		const reviseTd = document.createElement('td');
		const setBtn = document.createElement('button');
		const restTimeBtn = document.createElement('button');
		const deleteBtn = document.createElement('button');
		deleteBtn.addEventListener('click', deleteList);
		tr.id = Obj.id;
		nameTd.className = 'name';
		repsTd.className = 'reps';
		setTd.className = 'set';
		restTimeTd.className = 'rest-time';
		reviseTd.className = 'revice';
		setBtn.className = 'set-btn';
		restTimeBtn.className = 'rest-time-btn';
		deleteBtn.className = 'delete';
		table.appendChild(tr);
		tr.appendChild(nameTd);
		tr.appendChild(repsTd);
		tr.appendChild(setTd);
		tr.appendChild(restTimeTd);
		tr.appendChild(deleteBtn);
		deleteBtn.innerText = 'x';
		if (Obj.space) {
			tr.className = 'spaceRow';
		} else {
			setBtn.value = Obj.sets;
			restTimeBtn.value = parseInt(Obj.min) * 60 + parseInt(Obj.sec);
			nameTd.innerText = Obj.name;
			if (Obj.hasOwnProperty('reps')) {
				repsTd.innerText = `${Obj.reps}reps`;
			} else {
				repsTd.innerText = `${Obj.hold}sec`;
			}
			setBtn.innerText = `${Obj.sets}set`;
			restTimeBtn.innerText = `${Obj.min}:${
				Obj.sec < 10 ? `0${Obj.sec}` : Obj.sec
			}`;
			setTd.appendChild(setBtn);
			restTimeTd.appendChild(restTimeBtn);
		}
	}
}

function childsValue() {
	let childs = routineForm.children;
	if (childs[2].value === 'reps') {
		valuesObj = {
			name: childs[0].value,
			reps: childs[1].value,
			sets: childs[3].value,
			min: childs[4].value,
			sec: childs[5].value,
			id: String(Date.now()),
		};
	} else {
		valuesObj = {
			name: childs[0].value,
			hold: childs[1].value,
			sets: childs[3].value,
			min: childs[4].value,
			sec: childs[5].value,
			id: String(Date.now()),
		};
	}
	writeList(valuesObj);
	routine.push(valuesObj);
	saveRoutine();
}

function addRoutine(event) {
	event.preventDefault();
	childsValue();
}

function addSpace() {
	spaceObj = { space: true, id: String(Date.now()) };
	writeList(spaceObj);
	routine.push(spaceObj);
	saveRoutine();
}

function paintRoutine() {
	eraseList();
	routine.forEach(function (data) {
		writeList(data);
	});
}

function eraseList() {
	const child = table.querySelectorAll('tr');
	child.forEach(function (data) {
		table.removeChild(data);
	});
}

function saveRoutine() {
	localStorage.setItem(selectDay, JSON.stringify(routine));
}

function loadRoutine() {
	routine = JSON.parse(localStorage.getItem(selectDay)) || [];
	paintRoutine();
}

function removeSelect() {
	dayBtn.forEach(function (data) {
		if (data.value !== selectDay) {
			data.addEventListener('click', daySelect);
			data.parentNode.classList.remove('select');
		}
	});
}

function daySelect(event) {
	const target = event.target;
	const parent = target.parentNode;
	const dayValue = target.value;
	target.removeEventListener('click', daySelect);
	parent.classList.add('select');
	selectDay = dayValue;
	loadRoutine();
	removeSelect();
}

function dayBtnEvent(btn) {
	const btnValue = btn.value;
	if (btnValue === selectDay) {
		btn.parentNode.classList.add('select');
	} else {
		btn.addEventListener('click', daySelect);
	}
}

function init() {
	getToday();
	loadRoutine();
	routineForm.addEventListener('submit', addRoutine);
	space.addEventListener('click', addSpace);
	dayBtn.forEach(function (btn) {
		dayBtnEvent(btn);
	});
}

init();
