import {meteo} from "./dictionnaries_module.js";

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
	let finalData = weatherCodeWeatherStack(weatherCode);
	weatherDesscription.innerText = finalData.weatherDescription;
	outputCity.src = finalData.iconUrl;
}

function weatherCodeWeatherStack(weatherCode) {
	var weatherStacDictionnary = {
		113: meteo.sunny,
		296: meteo.lightRain,
		302: meteo.rain,
		305: meteo.storngRain,
		308: meteo.storngRain,
		116: meteo.cloudy,
		119: meteo.cloudy,
		122: meteo.cloudy,
		200: meteo.thunder,
		227: meteo.lightSnow,
		260: meteo.lightSnow,
		281: meteo.lightSnow,
		182: meteo.snow,
		185: meteo.snow,
		284: meteo.snow,
		230: meteo.strongSnow,
		311: meteo.hail,
		143: meteo.fog,
		248: meteo.fog,
		263: meteo.fog,
		266: meteo.fog,
		176: meteo.downpour,
		293: meteo.downpour,
		299: meteo.downpour,
		179: meteo.downpourSnow,
	}
	let weatherCodeLocal = weatherStacDictionnary[weatherCode];
	return weatherCodeLocal;
}