const apiKey = 'bd346e9ac63246aca38151512230209'
const header = document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#input')

form.onsubmit = function (e) {
	e.preventDefault()
	const city = input.value.trim()
	showWeather(city)
}

async function showWeather(city) {
	const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`

	try {
		const response = await fetch(url)
		const data = await response.json()
		handleWeatherData(data)
	} catch (error) {
		console.log('Error:', error)
	}
}

function handleWeatherData(data) {
	const prevCard = document.querySelector('.card')
	if (prevCard) prevCard.remove()

	if (data.error) {
		const html = `<div class='card'>${data.error.message}</div>`
		header.insertAdjacentHTML('afterend', html)
		alert('Mavjud bolmagan shaxar nomini yozdingiz')
	} else {
		const html = `<div class="card">
      <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
      <h3 class="card-city">${data.location.region}</h3>
      <div class="card-weather">
        <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
        <img class="card-img" src="${data.current.condition.icon}" alt="Weather">
      </div>
      <div class="card-description">${data.current.condition.text}</div>
    </div>`

		header.insertAdjacentHTML('afterend', html)
	}
}
