console.log(4)
// Grabbing all the elements
let currentTemp= document.getElementById("currentTemp")
let allTemps= document.getElementById("allTemps")
let humidSpan= document.getElementById("humidSpan")
let windSpeed= document.getElementById("windSpeed")
let humids= document.getElementById("humids")
let winds= document.getElementById("winds")
let city= document.getElementById("city")
let cityInput= document.getElementById("cityInput")
let tablesEntries = document.getElementById("tablesEntries")
let subBtn= document.getElementById("subBtn")
let cols = document.getElementsByClassName("col")


// API options
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2f7be06c68mshd18ebfe233dfab8p1dd28djsn5ee605e12ad4',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};


Array.from(cols).forEach(c=>{
    c.addEventListener('mouseover', (e)=>{
        Array.from(cols).forEach(c=>{
            c.children[0].classList.remove("border-primary")
            c.children[0].children[0].classList.remove("text-bg-primary")
            c.children[0].children[0].classList.remove("border-primary")
        })
        // console.log(c)
        c.children[0].classList.add("border-primary")
        c.children[0].children[0].classList.add("text-bg-primary")
        c.children[0].children[0].classList.add("border-primary")
    })
})


const getWeatherInfo = (city)=>{
    let url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;

    fetch(url, options).then(data=>{
        return data.json()
    }).then((result)=>{
        console.log(result)
        currentTemp.innerText = result.temp
        allTemps.innerHTML = `<li>Temperature: ${result.temp} &deg;C</li>
        <li>Maximum temperature: ${result.max_temp} &deg;C</li>
        <li>Minimum temperature: ${result.min_temp} &deg;C</li>`

        humidSpan.innerText = result.humidity
        humids.innerHTML = `
        <li>Humidity: ${result.humidity}%</li>
        <li>Feels like: ${result.feels_like}&deg; C</li>
        <li>Wind degree: ${result.wind_degrees}&deg;</li>
        `

        let sunriseDate = new Date(result.sunrise*1000)
        let sriseHour = sunriseDate.getHours()
        let sriseMinutes = sunriseDate.getMinutes()

        if(sriseMinutes < 10){
            sriseMinutes = '0' + sriseMinutes
        }

        let sunSetDate = new Date(result.sunset*1000)
        let sSetHour = sunSetDate.getHours()
        let sSetMinutes = sunSetDate.getMinutes()

        if(sSetMinutes < 10){
            sSetMinutes = '0' + sSetMinutes
        }
        let timeZone = "AM"
        if (sSetHour > 11){
            timeZone = "PM"
            if (sSetHour > 12){
                sSetHour -= 12
            }
        }

        windSpeed.innerText = result.wind_speed
        winds.innerHTML = `
        <li>Wind speed: ${result.wind_speed} km/hr</li>
        <li>Sunrise: ${sriseHour}:${sriseMinutes} AM</li>
        <li>Sunset: ${sSetHour}:${sSetMinutes} PM</li>
        `

        tablesEntries.innerHTML += `
        <tr>
        <th scope="row" class="text-start">${city[0].toUpperCase()+city.substr(1,)}</th>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${result.temp}&deg; C</td>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${result.min_temp}&deg; C</td>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${result.min_temp}&deg; C</td>
        <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg>${result.humidity}%</td>
      </tr>
        `

    }).catch(e=>{
        console.log(e)
    })
}

subBtn.addEventListener("click", e=>{
    e.preventDefault()
    if (cityInput.value.trim().length > 1){
        // console.log(cityInput.value)
        getWeatherInfo(cityInput.value)
        city.innerText = cityInput.value
    }
})
getWeatherInfo("bhopal")