const weather = document.querySelector('.js-weather');

const API_KEY = '45a1863da3a3907a8b88e8a854be567a';
const COORDS = 'coords';

function getWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			const temp = json.main.temp;
			weather.innerText = `${temp}℃`;
		});
}

function saveCoords(Obj) {
	localStorage.setItem(COORDS, JSON.stringify(Obj));
}

function handleGeoSucces(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	const coordsObj = {
		lat,
		lon,
	};
	saveCoords(coordsObj);
	getWeather(lat, lon);
}

function handleGeoError() {
	console.log("Can't access geo location");
}

function askForCoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
	const loadedCoords = localStorage.getItem(COORDS);
	if (loadedCoords === null) {
		askForCoords();
	} else {
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.lat, parsedCoords.lon);
	}
}

function init() {
	loadCoords();
}

init();
