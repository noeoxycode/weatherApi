import {giveRightTextAndIcon} from "./dictionnaries_module.js";

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
	let weatherCodeLocal = weatherCodeMeteoConcept(weatherCode);
	let finalData = giveRightTextAndIcon(weatherCodeLocal);
	weatherDesscription.innerText = finalData.weatherDescription;
	outputCity.src = finalData.iconUrl;
}

function weatherCodeMeteoConcept (weatherCode)
{
	var meteoConceptDictionnary = {
		0: 0,
		1: 4,
		2: 4,
		3: 4,
		4: 4,
		5: 4,
		6: 11,
		7: 11,
		10: 1,
		11: 2,
		12: 3,
		13: 1,
		14: 2,
		15: 3,
		16: 1,
		20: 7,
		21: 6,
		22: 8,
		30: 10,
		31: 10,
		32: 10,
		40: 12,
		41: 12,
		42: 12,
		43: 12,
		44: 12,
		45: 12,
		46: 12,
		47: 12,
		48: 12,
		60: 13,
		61: 13,
		62: 13,
		63: 13,
		64: 13,
		65: 13,
		66: 13,
		67: 13,
		68: 13,
		70: 10,
		71: 10,
		72: 10,
		73: 10,
		74: 10,
		75: 10,
		76: 10,
		77: 10,
		78: 10,
		100: 5,
		101: 5,
		102: 5,
		103: 5,
		104: 5,
		105: 5,
		106: 5,
		107: 5,
		108: 5,
		120: 5,
		121: 5,
		122: 5,
		123: 5,
		124: 5,
		125: 5,
		126: 5,
		127: 5,
		128: 5,
		130: 5,
		131: 5,
		132: 5,
		133: 5,
		134: 5,
		135: 5,
		136: 5,
		137: 5,
		138: 5,
		140: 5,
		141: 5,
		142: 5,
		210: 1,
		211: 2,
		212: 3,
		220: 6,
		221: 7,
		222: 8,
		230: 10,
		231: 10,
		232: 10,
		235: 9,
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