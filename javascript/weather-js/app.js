// Init Storage
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();
// Init wather object
const weather = new Weather(weatherLocation.city, weatherLocation.state);

// Init UI
const ui = new UI();
// Get weather on DOM load
document.addEventListener("DOMContentLoaded", getWeather);

// Change Location Event
document.getElementById("w-change-btn").addEventListener("click", e => {
  let city = document.getElementById("city").value;
  let state = document.getElementById("state").value;
  // Allos search only by City name by passing empty State
  if (state.length === 0) {
    state = " ";
  }
  // Change default location variables
  weather.changeLocation(city, state);

  // Set location in Local Storage
  storage.setLocationData(city, state);

  // Get and display weather
  getWeather();
  // Close modal
  $("#locModal").modal("hide");
});
// Get weather function
function getWeather() {
  weather
    .getWeather()
    .then(results => {
      ui.showUI(results);
    })
    .catch(err => console.log(err));
}
