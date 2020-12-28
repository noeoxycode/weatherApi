import {giveRightTextAndIcon} from "./dictionnaries_module.js";

export async function weatherstackApi(city) {
	const accessKey = "fcece908fe429e785ee4a28314e30573";
	const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}`;
	const outputCity = document.getElementById("disp-weatherstack");
	let weatherDesscription = document.getElementById("weatherstack-weather-descriptions");
	let humidity = document.getElementById("weatherstack-humidity");
	let pressure  = document.getElementById("weatherstack-pressure");
	let temperature  = document.getElementById("weatherstack-temperature");
	let windDir = document.getElementById("weatherstack-wind-direction");
	let windSpeed = document.getElementById("weatherstack-wind-speed");
	const promise = fetch(url);
	let response = await fetch(url);
	let data = await response.json();
	humidity.innerText = data.current.humidity;
	pressure.innerText = data.current.pressure;
	temperature.innerText = data.current.temperature;
	windDir.innerText = data.current.wind_dir;
	windSpeed.innerText = data.current.wind_speed;
	let weatherCode = data.current.weather_code;
	let weatherCodeLocal = weatherCodeWeatherStack(weatherCode);
	let finalData = giveRightTextAndIcon(weatherCodeLocal);
	weatherDesscription.innerText = finalData.weatherDescription;
	outputCity.src = finalData.iconUrl;
}

function weatherCodeWeatherStack(weatherCode) {
	var weatherStacDictionnary = {
		113: 0,
		296: 1,
		302: 2,
		305: 3,
		308: 3,
		116: 4,
		119: 4,
		122: 4,
		200: 5,
		227: 6,
		260: 6,
		281: 6,
		182: 7,
		185: 7,
		284: 7,
		230: 8,
		311: 9,
		143: 11,
		248: 11,
		263: 11,
		266: 11,
		176: 12,
		293: 12,
		299: 12,
		179: 13,
	}
	let weatherCodeLocal = weatherStacDictionnary[weatherCode];
	return weatherCodeLocal;
}