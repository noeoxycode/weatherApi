import {meteo} from "./dictionnaries_module.js";
import {displayApi} from "./displayApi.js";


export async function weatherstackApi(city) {
	const accessKey = "fcece908fe429e785ee4a28314e30573";
	const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}`;
	let response = await fetch(url);
	let data = await response.json();
	var weatherstackInfo = {
		humidity : data.current.humidity,
		pressure : data.current.pressure,
		temperature : data.current.temperature,
		windDir : data.current.wind_dir,
		windSpeed : data.current.wind_speed,
		meteoObject : weatherCodeWeatherStack(data.current.weather_code),
		apiId : "weatherstack"
	}
	displayApi(weatherstackInfo);
	return weatherstackInfo;

}

function weatherCodeWeatherStack(weatherCode) {
	var weatherStacDictionnary = {
		113: meteo.sunny,
		296: meteo.lightRain,
		302: meteo.rain,
		305: meteo.strongRain,
		308: meteo.strongRain,
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
	let meteoObject = weatherStacDictionnary[weatherCode];
	return meteoObject;
}