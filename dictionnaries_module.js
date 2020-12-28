export function giveRightTextAndIcon (weatherCodeLocal)
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