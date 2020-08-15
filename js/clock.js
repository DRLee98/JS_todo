const clockContainer = document.querySelector('.js-clock');
const dayTitle = clockContainer.querySelector('h2');
const clockTitle = clockContainer.querySelector('h1');

function getTime() {
	const date = new Date();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const sec = date.getSeconds();

	clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
		minutes < 10 ? `0${minutes}` : minutes
	}`;
	dayTitle.innerText = `${month}/${day}`;
}

function init() {
	setInterval(getTime, 1000);
}

init();
