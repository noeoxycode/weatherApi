export function displayApi (info)
{
	document.getElementById(`disp-${info.apiId}`).src = info.meteoObject.iconUrl;
	document.getElementById(`${info.apiId}-weather-descriptions`).innerText = info.meteoObject.weatherDescription;
	document.getElementById(`${info.apiId}-humidity`).innerText = info.humidity;
	document.getElementById(`${info.apiId}-pressure`).innerText = info.pressure;
	document.getElementById(`${info.apiId}-temperature`).innerText = info.temperature;
	document.getElementById(`${info.apiId}-wind-direction`).innerText = info.windDir;
	document.getElementById(`${info.apiId}-wind-speed`).innerText = info.windSpeed;
}