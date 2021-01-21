//lien vers l'api :  https://www.prevision-meteo.ch/services
//sa doc pour json : https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf
import {meteo} from "./dictionnaries_module.js";
import {displayApi} from "./displayApi.js";

export async function previsionmeteoApi (city) {
	const url = `https://www.prevision-meteo.ch/services/json/${city}`;
	let response = await fetch(url);
	let data = await response.json();
	var previsionsMeteoInfo =
		{
			humidity : data.current_condition.humidity,
			pressure : data.current_condition.pressure,
			temperature : data.current_condition.tmp,
			windDir : data.current_condition.wnd_dir,
			windSpeed : data.current_condition.wnd_spd,
			meteoObject : weatherCodePrevisionsMeteo(data.current_condition.condition),
			apiId: "previsionsmeteo",
		}
	displayApi(previsionsMeteoInfo)
}

function weatherCodePrevisionsMeteo(weatherCode)
{
	var previsionsMeteoDictionnary = {
		"Ensoleillé": meteo.sunny,
		"Nuit claire": meteo.sunny,
		"Pluie faible": meteo.lightRain,
		"Pluie modérée": meteo.rain,
		"Pluie forte": meteo.strongRain,
		"Ciel voilé": meteo.cloudy,
		"Nuit légèrement voilée": meteo.cloudy,
		"Faibles passages nuageux": meteo.cloudy,
		"Stratus": meteo.cloudy,
		"Stratus se dissipant": meteo.cloudy,
		"Nuit claire et stratus": meteo.cloudy,
		"Eclaircies": meteo.cloudy,
		"Nuit nuageuse": meteo.cloudy,
		"Faiblement nuageux": meteo.cloudy,
		"Fortement nuageux": meteo.cloudy,
		"Développement nuageux": meteo.cloudy,
		"Nuit avec développement nuageux": meteo.cloudy,
		"Faiblement orageux": meteo.thunder,
		"Nuit faiblement orageuse": meteo.thunder,
		"Orage modéré": meteo.thunder,
		"Fortement orageux": meteo.thunder,
		"Neige faible": meteo.lightSnow,
		"Neige modérée": meteo.snow,
		"Neige forte": meteo.strongSnow,
		"Pluie et neige mêlée faible": meteo.rainAndSnow,
		"Pluie et neige mêlée modérée": meteo.rainAndSnow,
		"Pluie et neige mêlée forte": meteo.rainAndSnow,
		"Brouillard": meteo.fog,
		"Averses de pluie faible": meteo.downpour,
		"Nuit avec averses": meteo.downpour,
		"Averses de pluie modérée": meteo.downpour,
		"Averses de pluie forte": meteo.downpour,
		"Couvert avec averses": meteo.downpour,
		"Averses de neige faible": meteo.downpourSnow,
		"Nuit avec averses de neige faible": meteo.downpourSnow,
	}
	let meteoObject = previsionsMeteoDictionnary[weatherCode];
	return meteoObject;
}