async function callApi() {
	const loader = document.getElementsByClassName("loader");
	//const weatherstackloader = document.getElementById("disp-weatherstack");
	//const previsionsmeteoloader = document.getElementById("disp-previsionsmeteo");
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
	//weatherstackloader.src = "loader.gif";
	//previsionsmeteoloader.src = "loader.gif";
	//apigeo(city);
	console.log(city);
	await apigeo(city);
	weatherstackApi(city);
	previsionmeteoApi(city);


	button.disabled = false;

}
//https://api.gouv.fr/les-api/api-geo
async function apigeo(city) {
	let city_name = document.getElementById("city-name");
	let city_departement = document.getElementById("city-departement");
	const url = `https://geo.api.gouv.fr/communes?nom=${city}&fields=departement&boost=population&limit=5`;
	let response = await fetch(url);
	let data = await response.json();
	console.log(data);
	city_name.innerText = data[0].nom;
	city_departement.innerText = data[0].departement.code;
	let codeInsee = data[0].code;
	console.log(codeInsee)
	meteoConcept(codeInsee);
}

function weatherstackApi(city) {
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
	promise
		.then(res => res.json())
		.then(data => {
			humidity.innerText = data.current.humidity;
			pressure.innerText = data.current.pressure;
			temperature.innerText = data.current.temperature;
			windDir.innerText = data.current.wind_dir;
			windSpeed.innerText = data.current.wind_speed;
			let weatherCode = data.current.weather_code;
			let weatherCodeLocal = weatherCodeWeatherStack(weatherCode);
			structureTest = giveRightTextAndIcon(weatherCodeLocal);
			weatherDesscription.innerText = structureTest.weatherDescription;
			outputCity.src = structureTest.iconUrl;
					});

		
}



//lien vers l'api :  https://www.prevision-meteo.ch/services
//sa doc pour json : https://www.prevision-meteo.ch/uploads/pdf/recuperation-donnees-meteo.pdf
function previsionmeteoApi (city) {
	const url = `https://www.prevision-meteo.ch/services/json/${city}`;
	const outputCity = document.getElementById("disp-previsionsmeteo");
	let weatherDesscription = document.getElementById("previsionsmeteo-weather-descriptions");
	let humidity = document.getElementById("previsionsmeteo-humidity");
	let pressure  = document.getElementById("previsionsmeteo-pressure");
	let temperature  = document.getElementById("previsionsmeteo-temperature");	
	let windDir = document.getElementById("previsionsmeteo-wind-direction");	
	let windSpeed = document.getElementById("previsionsmeteo-wind-speed");
	const promise = fetch(url);
	promise
		.then(res => res.json())
		.then(data => {
			humidity.innerText = data.current_condition.humidity;
			pressure.innerText = data.current_condition.pressure;
			temperature.innerText = data.current_condition.tmp;
			windDir.innerText = data.current_condition.wnd_dir;
			windSpeed.innerText = data.current_condition.wnd_spd;
			const weatherCode = data.current_condition.condition;
			let weatherCodeLocal = weatherCodePrevisionsMeteo(weatherCode);
			structureTest = giveRightTextAndIcon(weatherCodeLocal);
			weatherDesscription.innerText = structureTest.weatherDescription;
			outputCity.src = structureTest.iconUrl;		
		});
		

}

function meteoConcept(codeInsee) {
	const accessKey = "8eea2f3c24232fdb26e1c409ac3bf10fe27600e0e6795c02052d8e113d29e91f";
	const url = `https://api.meteo-concept.com/api/forecast/nextHours?token=${accessKey}&insee=77139`;
	console.log(url);
	const outputCity = document.getElementById("disp-meteoconcept");
	let weatherDesscription = document.getElementById("meteoconcept-weather-descriptions");
	let humidity = document.getElementById("meteoconcept-humidity");
	let pressure  = document.getElementById("meteoconcept-pressure");
	let temperature  = document.getElementById("meteoconcept-temperature");	
	let windDir = document.getElementById("meteoconcept-wind-direction");	
	let windSpeed = document.getElementById("meteoconcept-wind-speed");
	let promise = fetch(url);
	promise
		.then(res => res.json())
		.then(data => {
			console.log(data);
			humidity.innerText = data.forecast[0].rh2m;			
			windDir.innerText = convertorDegreeToString (data.forecast[0].dirwind10m);
			windSpeed.innerText = data.forecast[0].wind10m
			temperature.innerText = data.forecast[0].temp2m;
			const weatherCode = data.forecast[0].weather;
			let weatherCodeLocal = weatherCodeMeteoConcept (weatherCode);
			structureTest = giveRightTextAndIcon(weatherCodeLocal);
			weatherDesscription.innerText = structureTest.weatherDescription;
			outputCity.src = structureTest.iconUrl;
					});}
		

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



function weatherCodeWeatherStack(weatherCode)

{
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


function giveRightTextAndIcon (weatherCodeLocal)
{
	var array = [];
	array.push({ weatherDescription: 'Soleil', iconUrl: 'weatherIcons/sunny.png' });
	array.push({ weatherDescription: 'Pluie légère', iconUrl: 'weatherIcons/rain.png' });
	array.push({ weatherDescription: 'Pluie', iconUrl: 'weatherIcons/rain.png' });
	array.push({ weatherDescription: 'Pluie forte', iconUrl: 'weatherIcons/rain.png' });
	array.push({ weatherDescription: 'Nuageux', iconUrl: 'weatherIcons/cloudy.png' });
	array.push({ weatherDescription: 'Orages', iconUrl: 'weatherIcons/thunder.png' });
	array.push({ weatherDescription: 'Neige modérée', iconUrl: 'weatherIcons/snow.png' });
	array.push({ weatherDescription: 'Neige', iconUrl: 'weatherIcons/snow.png' });
	array.push({ weatherDescription: 'Neige forte', iconUrl: 'weatherIcons/snow.png' });
	array.push({ weatherDescription: 'Grêle', iconUrl: 'weatherIcons/rain.png' });
	array.push({ weatherDescription: 'Pluie et neige', iconUrl: 'weatherIcons/rainandsnow.png' });
	array.push({ weatherDescription: 'Brouillard', iconUrl: 'weatherIcons/fog.png' });
	array.push({ weatherDescription: 'Averse', iconUrl: 'weatherIcons/rain.png' });
	array.push({ weatherDescription: 'Averse de neige', iconUrl: 'weatherIcons/snow.png' });

	 return array[weatherCodeLocal];

}

