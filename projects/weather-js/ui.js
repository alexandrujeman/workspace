class UI {
  constructor() {
    this.location = document.getElementById('w-location')
    this.desc = document.getElementById('w-desc')
    this.string = document.getElementById('w-string')
    this.details = document.getElementById('w-details')
    this.icon = document.getElementById('w-icon')
    this.humidity = document.getElementById('w-humidity')
    this.feelslike = document.getElementById('feels-like')
    this.dewpoint = document.getElementById('w-dewpoint')
    this.wind = document.getElementById('w-wind')
  }
  showUI(weather) {
    // Process data
    let fullLocation = `${weather.location.city},${weather.location.region}`
    let temperatureString = `Low: ${weather.forecasts[0].low}°C, High: ${weather.forecasts[0].high}°C`
    let weatherIcon = `https://s.yimg.com/zz/combo?a/i/us/nws/weather/gr/${weather.current_observation.condition.code}d.png`
    let currentWind = `chill: ${weather.current_observation.wind.chill}, direction: ${weather.current_observation.wind.direction}, speed: ${weather.current_observation.wind.speed}`
    // Asign
    this.location.textContent = fullLocation;
    this.desc.textContent = weather.current_observation.condition.text
    this.string.textContent = temperatureString
    this.icon.setAttribute('src', weatherIcon)
    this.icon.setAttribute('height', '120px')
    
    this.humidity.textContent = `Relative humidity: ${weather.current_observation.atmosphere.humidity}%`
    this.feelslike.textContent = `Feels Like: ${weather.current_observation.condition.temperature}°C`
    this.dewpoint.textContent = `Visibility: ${weather.current_observation.atmosphere.visibility}`
    this.wind.textContent = `Wind: ${currentWind}`

  }
}