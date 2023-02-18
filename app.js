window.addEventListener('load', () => {
    let long
    let lat
    let temperatureDescription = document.querySelector(
        '.temperature-description'
    )
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.degree-section')
    let windSection = document.querySelector('.wind')
    let humiditySection = document.querySelector('.humidity')
    const temperatureSpan = document.querySelector('.degree-section span')
    let dater = document.querySelector('.date')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude
            console.log(position)

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=146dd30891281d80b7909f52f75580f8`
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(data)
                    let { temp, humidity } = data.main
                    const celsius = Math.floor(temp - 273.15)

                    let city = data.name
                    let wind = data.wind.speed

                    let { description, icon } = data.weather[0]

                    // Set DOM Elements from the API
                    temperatureDegree.textContent = celsius
                    temperatureDescription.textContent = description
                    locationTimezone.textContent = `${city}`
                    humiditySection.textContent = `${humidity} %`
                    windSection.textContent = `${wind} mph`

                    // Formula for fahrenheit
                    let fahrenheit = (celsius * 9) / 5 + 32

                    // Set icon
                    setIcons(icon, document.querySelector('.icon'))

                    //set Date
                    let d = new Date().toLocaleTimeString()
                    dater.innerHTML = d.replace(/:\d+ /, ' ')

                    //onclick to fahrenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === '°C') {
                            temperatureSpan.textContent = '°F'
                            temperatureDegree.textContent = Math.floor(fahrenheit)
                        } else {
                            temperatureSpan.textContent = '°C'
                            temperatureDegree.textContent = celsius
                        }
                    })
                })
        })
    } else {
        h3.textContent = "hey, this won't work until you grant location permission."
    }
    //getting icons
    function setIcons(icon) {
        const skycons = new Skycons({ color: 'white' })
        skycons.play()
        skycons.set('icon', Skycons.CLEAR_DAY)
        skycons.set('icon', Skycons.CLEAR_NIGHT)
        skycons.set('icon', Skycons.PARTLY_CLOUDY_DAY)
        skycons.set('icon', Skycons.PARTLY_CLOUDY_NIGHT)
        skycons.set('icon', Skycons.CLOUDY)
        skycons.set('icon', Skycons.RAIN)
        skycons.set('icon', Skycons.SLEET)
        skycons.set('icon', Skycons.SNOW)
        skycons.set('icon', Skycons.FOG)

        switch (icon) {
            case '01d':
                skycons.add(document.querySelector('.icon'), Skycons.CLEAR_DAY)
                break
            case '01n':
                skycons.add(document.querySelector('.icon'), Skycons.CLEAR_NIGHT)
                break
            case '02d':
                skycons.add(document.querySelector('.icon'), Skycons.PARTLY_CLOUDY_DAY)
                break
            case '02n':
                skycons.add(
                    document.querySelector('.icon'),
                    Skycons.PARTLY_CLOUDY_NIGHT
                )
                break
            case '03d':
                skycons.add(document.querySelector('.icon'), Skycons.CLOUDY)
                break
            case '03n':
                skycons.add(document.querySelector('.icon'), Skycons.CLOUDY)
                break
            case '04d':
                skycons.add(document.querySelector('.icon'), Skycons.CLOUDY)
                break
            case '04n':
                skycons.add(document.querySelector('.icon'), Skycons.CLOUDY)
                break
            case '09d':
                skycons.add(document.querySelector('.icon'), Skycons.RAIN)
                break
            case '09n':
                skycons.add(document.querySelector('.icon'), Skycons.RAIN)
                break
            case '10d':
                skycons.add(document.querySelector('.icon'), Skycons.SLEET)
                break
            case '10n':
                skycons.add(document.querySelector('.icon'), Skycons.SLEET)
                break
            case '11d':
                skycons.add(document.querySelector('.icon'), Skycons.SLEET)
                break
            case '11n':
                skycons.add(document.querySelector('.icon'), Skycons.SLEET)
                break
            case '13d':
                skycons.add(document.querySelector('.icon'), Skycons.SNOW)
                break
            case '13n':
                skycons.add(document.querySelector('.icon'), Skycons.SNOW)
                break
            case '50d':
                skycons.add(document.querySelector('.icon'), Skycons.FOG)
                break
            case '50n':
                skycons.add(document.querySelector('.icon'), Skycons.FOG)
                break
            default:
                '???'
        }
    }
})
