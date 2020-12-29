import {apigeo} from "./apiGeoModule.js";
import {weatherstackApi} from './weatherStackApiModule.js';
import {meteoConcept} from "./meteoConceptModule.js";
import {previsionmeteoApi} from "./previsionsMeteoModule.js";

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


