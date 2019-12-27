class Weather {
  constructor(city, state) {
    this.city = city
    this.state = state
  }

  async getWeather() {
    const response = await fetch(`http://127.0.0.1:5000/weather/${this.city}/${this.state}/`)

    const responseData = await response.json();

    return (JSON.parse(responseData))
  }

  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}