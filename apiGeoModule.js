//https://api.gouv.fr/les-api/api-geo
export async function apigeo(city) {
	let city_name = document.getElementById("city-name");
	let city_departement = document.getElementById("city-departement");
	const url = `https://geo.api.gouv.fr/communes?nom=${city}&fields=departement&boost=population&limit=5`;
	let response = await fetch(url);
	let data = await response.json();
	city_name.innerText = data[0].nom;
	city_departement.innerText = data[0].departement.code;
	let codeInsee = data[0].code;
	return codeInsee;
}