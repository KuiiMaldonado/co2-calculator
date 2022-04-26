const WEATHER_API_URL = 'https://api.openweathermap.org/';
const WEATHER_API_KEY = '865284dc0e4d44eddd23a2592bd48d0a';

var weather = {};
var getStartedBtn = document.getElementById("getStartedBtn");
var surveyModal = document.getElementById("surveyModal");
var closeBtn = document.getElementById("closeSurveyBtn");
var nextBtn = document.getElementById("nextSurveyBtn");


// Open modal with Get started button

getStartedBtn.onclick = function () {
  surveyModal.style.display = "flex";
}

// Closes modal with Close button

closeBtn.onclick = function () {
  surveyModal.style.display = "none";
}

// Closes modal while clicking outside it

window.onclick = function (event) {
  if (event.target == surveyModal) {
    surveyModal.style.display = "none";
  }
}
//Geolocation API
function getLocationWeather(position) {

  let coordinates = position.coords;
  let requestURL = WEATHER_API_URL + 'data/2.5/onecall?lat=' + coordinates.latitude + '&lon=' + coordinates.longitude + '&units=metric' + '&appid=' + WEATHER_API_KEY;

  fetch(requestURL).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);

    let date = new Date(data.current.dt * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    weather.date = day + '/' + month + '/' + year;
    weather.temp = data.current.temp;
    weather.humidity = data.current.humidity;
    weather.icon = 'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png';

    console.log(weather.date);
    console.log(weather.temp);
    console.log(weather.humidity);
    console.log(weather.icon);
  });
}

//Call to get the location, then the weather for those coordinates;
navigator.geolocation.getCurrentPosition(getLocationWeather);
