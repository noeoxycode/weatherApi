//lien vers l'api :  https://www.prevision-meteo.ch/services
//sa doc pour json : https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf
import {giveRightTextAndIcon} from "./dictionnaries_module.js";

export async function previsionmeteoApi (city) {
	const url = `https://www.prevision-meteo.ch/services/json/${city}`;
	const outputCity = document.getElementById("disp-previsionsmeteo");
	let weatherDesscription = document.getElementById("previsionsmeteo-weather-descriptions");
	let humidity = document.getElementById("previsionsmeteo-humidity");
	let pressure  = document.getElementById("previsionsmeteo-pressure");
	let temperature  = document.getElementById("previsionsmeteo-temperature");
	let windDir = document.getElementById("previsionsmeteo-wind-direction");
	let windSpeed = document.getElementById("previsionsmeteo-wind-speed");
	const promise = fetch(url);
	let response = await fetch(url);
	let data = await response.json();
	humidity.innerText = data.current_condition.humidity;
	pressure.innerText = data.current_condition.pressure;
	temperature.innerText = data.current_condition.tmp;
	windDir.innerText = data.current_condition.wnd_dir;
	windSpeed.innerText = data.current_condition.wnd_spd;
	const weatherCode = data.current_condition.condition;
	let weatherCodeLocal = weatherCodePrevisionsMeteo(weatherCode);
	let finalData = giveRightTextAndIcon(weatherCodeLocal);
	weatherDesscription.innerText = finalData.weatherDescription;
	outputCity.src = finalData.iconUrl;
}

function weatherCodePrevisionsMeteo(weatherCode)
{
	var previsionsMeteoDictionnary = {
		"Ensoleillé": 0,
		"Nuit claire": 0,
		"Pluie faible": 1,
		"Pluie modérée": 2,
		"Pluie forte": 3,
		"Ciel voilé ": 4,
		"Nuit légèrement voilée": 4,
		"Faibles passages nuageux": 4,
		"Stratus": 4,
		"Stratus se dissipant": 4,
		"Nuit claire et stratus": 4,
		"Eclaircies": 4,
		"Nuit nuageuse": 4,
		"Faiblement nuageux": 4,
		"Fortement nuageux": 4,
		"Développement nuageux": 4,
		"Nuit avec développement nuageux": 4,
		"Faiblement orageux": 5,
		"Nuit faiblement orageuse": 5,
		"Orage modéré": 5,
		"Fortement orageux": 5,
		"Neige faible": 6,
		"Neige modérée": 7,
		"Neige forte": 8,
		"Pluie et neige mêlée faible": 10,
		"Pluie et neige mêlée modérée": 10,
		"Pluie et neige mêlée forte": 10,
		"Brouillard": 11,
		"Averses de pluie faible": 12,
		"Nuit avec averses": 12,
		"Averses de pluie modérée": 12,
		"Averses de pluie forte": 12,
		"Couvert avec averses": 12,
		"Averses de neige faible": 13,
		"Nuit avec averses de neige faible": 13,
	}
	let weatherCodeLocal = previsionsMeteoDictionnary[weatherCode];
	return weatherCodeLocal;
}