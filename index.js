import {apigeo} from "./apiGeoModule.js";
import {weatherstackApi} from './weatherStackApiModule.js';
import {meteoConcept} from "./meteoConceptModule.js";
import {previsionmeteoApi} from "./previsionsMeteoModule.js";

export const meteo = {
	sunny : {weatherDescription: 'Soleil', iconUrl: 'weatherIcons/sunny.png'},
	lightRain :{ weatherDescription: 'Pluie légère', iconUrl: 'weatherIcons/rain.png' },
	rain :{ weatherDescription: 'Pluie', iconUrl: 'weatherIcons/rain.png' },
	strongRain :{ weatherDescription: 'Pluie forte', iconUrl: 'weatherIcons/rain.png' },
	cloudy :{ weatherDescription: 'Nuageux', iconUrl: 'weatherIcons/cloudy.png' },
	thunder :{ weatherDescription: 'Orages', iconUrl: 'weatherIcons/thunder.png' },
	lightSnow:{ weatherDescription: 'Neige modérée', iconUrl: 'weatherIcons/snow.png' },
	snow :{ weatherDescription: 'Neige', iconUrl: 'weatherIcons/snow.png' },
	strongSnow :{ weatherDescription: 'Neige forte', iconUrl: 'weatherIcons/snow.png' },
	hail :{ weatherDescription: 'Grêle', iconUrl: 'weatherIcons/rain.png' },
	rainAndSnow:{ weatherDescription: 'Pluie et neige', iconUrl: 'weatherIcons/rainandsnow.png' },
	fog:{ weatherDescription: 'Brouillard', iconUrl: 'weatherIcons/fog.png' },
	downpour :{ weatherDescription: 'Averse', iconUrl: 'weatherIcons/rain.png' },
	downpourSnow :{ weatherDescription: 'Averse de neige', iconUrl: 'weatherIcons/snow.png' },
};

export async function callApi() {
	const loader = document.getElementsByClassName("loader");
	const weatherstackloader = document.getElementById("disp-weatherstack");
	const previsionsmeteoloader = document.getElementById("disp-previsionsmeteo");
	const button = document.querySelector('button')
	button.disabled = true;
	let error;
	const city = document.getElementById("input-city").value;

	
	if (!city) {
		error = "Veuillez renseigner une ville";
	}

	if (error) {
		document.getElementById("error").innerHTML = error;
		return;
	}
	loader.src = "loader.gif"
	weatherstackloader.src = "loader.gif";
	previsionsmeteoloader.src = "loader.gif";
	console.log(city);
	let codeInsee = await apigeo(city);
	weatherstackApi(city);
	previsionmeteoApi(city);
	meteoConcept(codeInsee);
	button.disabled = false;
}


