import {meteo} from "./index.js";

export async function meteoConcept(codeInsee) {
	const accessKey = "8eea2f3c24232fdb26e1c409ac3bf10fe27600e0e6795c02052d8e113d29e91f";
	const url = `https://api.meteo-concept.com/api/forecast/nextHours?token=${accessKey}&insee=77139`;
	console.log(url);
	const outputCity = document.getElementById("disp-meteoconcept");
	let weatherDesscription = document.getElementById("meteoconcept-weather-descriptions");
	let humidity = document.getElementById("meteoconcept-humidity");
	let pressure = document.getElementById("meteoconcept-pressure");
	let temperature = document.getElementById("meteoconcept-temperature");
	let windDir = document.getElementById("meteoconcept-wind-direction");
	let windSpeed = document.getElementById("meteoconcept-wind-speed");
	let promise = fetch(url);
	let response = await fetch(url);
	let data = await response.json();
	console.log(data);
	humidity.innerText = data.forecast[0].rh2m;
	windDir.innerText = convertorDegreeToString(data.forecast[0].dirwind10m);
	windSpeed.innerText = data.forecast[0].wind10m
	temperature.innerText = data.forecast[0].temp2m;
	const weatherCode = data.forecast[0].weather;
	let finalData = weatherCodeMeteoConcept(weatherCode);
	weatherDesscription.innerText = finalData.weatherDescription;
	outputCity.src = finalData.iconUrl;
}

function weatherCodeMeteoConcept (weatherCode)
{
	var meteoConceptDictionnary = {
		0: meteo.sunny,
		1: meteo.cloudy,
		2: meteo.cloudy,
		3: meteo.cloudy,
		4: meteo.cloudy,
		5: meteo.cloudy,
		6: meteo.fog,
		7: meteo.fog,
		10: meteo.lightRain,
		11: meteo.rain,
		12: meteo.strongRain,
		13: meteo.lightRain,
		14: meteo.rain,
		15: meteo.strongRain,
		16: meteo.lightRain,
		20: meteo.snow,
		21: meteo.lightSnow,
		22: meteo.strongSnow,
		30: meteo.rainAndSnow,
		31: meteo.rainAndSnow,
		32: meteo.rainAndSnow,
		40: meteo.downpour,
		41: meteo.downpour,
		42: meteo.downpour,
		43: meteo.downpour,
		44: meteo.downpour,
		45: meteo.downpour,
		46: meteo.downpour,
		47: meteo.downpour,
		48: meteo.downpour,
		60: meteo.downpourSnow,
		61: meteo.downpourSnow,
		62: meteo.downpourSnow,
		63: meteo.downpourSnow,
		64: meteo.downpourSnow,
		65: meteo.downpourSnow,
		66: meteo.downpourSnow,
		67: meteo.downpourSnow,
		68: meteo.downpourSnow,
		70: meteo.rainAndSnow,
		71: meteo.rainAndSnow,
		72: meteo.rainAndSnow,
		73: meteo.rainAndSnow,
		74: meteo.rainAndSnow,
		75: meteo.rainAndSnow,
		76: meteo.rainAndSnow,
		77: meteo.rainAndSnow,
		78: meteo.rainAndSnow,
		100: meteo.thunder,
		101: meteo.thunder,
		102: meteo.thunder,
		103: meteo.thunder,
		104: meteo.thunder,
		105: meteo.thunder,
		106: meteo.thunder,
		107: meteo.thunder,
		108: meteo.thunder,
		120: meteo.thunder,
		121: meteo.thunder,
		122: meteo.thunder,
		123: meteo.thunder,
		124: meteo.thunder,
		125: meteo.thunder,
		126: meteo.thunder,
		127: meteo.thunder,
		128: meteo.thunder,
		130: meteo.thunder,
		131: meteo.thunder,
		132: meteo.thunder,
		133: meteo.thunder,
		134: meteo.thunder,
		135: meteo.thunder,
		136: meteo.thunder,
		137: meteo.thunder,
		138: meteo.thunder,
		140: meteo.thunder,
		141: meteo.thunder,
		142: meteo.thunder,
		210: meteo.lightRain,
		211: meteo.rain,
		212: meteo.strongRain,
		220: meteo.lightSnow,
		221: meteo.snow,
		222: meteo.strongSnow,
		230: meteo.rainAndSnow,
		231: meteo.rainAndSnow,
		232: meteo.rainAndSnow,
		235: meteo.hail,
	}
	let weatherCodeLocal = meteoConceptDictionnary[weatherCode];
	return weatherCodeLocal;
}


function convertorDegreeToString (dirwind10m)
{
	if (dirwind10m <= 22.5) return "N";
	else if (dirwind10m <= 67.5)return "NE";
	else if (dirwind10m <= 112.5) return "E";
	else if (dirwind10m <= 157.5) return "SE";
	else if (dirwind10m <= 202.5) return "S";
	else if (dirwind10m <= 247.5) return "SO";
	else if (dirwind10m <= 292.5) return "O";
	else if (dirwind10m <= 337.5) return "NO";
	else if (dirwind10m <= 360) return "N";
	else return "ERROR";
}