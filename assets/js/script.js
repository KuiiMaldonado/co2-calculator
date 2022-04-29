var getStartedBtn = document.getElementById("getStartedBtn")
var surveyModal = document.getElementById("surveyModal")
var dataModal = document.getElementById("dataModal")
var closeBtn = document.getElementById("closeSurveyBtn")
var nextBtn = document.getElementById("nextSurveyBtn")
var questionNumber = document.querySelector("#questionLabel");
var mainQuestion = document.querySelector("#mainQuestion");
var moneyinput = document.querySelector("#money")
var progressBar = document.querySelector("#progressBar");
var average = document.getElementById("average");
var resultsSection = document.getElementById('results-section');

//vars for questions
var currentQuestion;
const questions = [
  {
    question: "On average, how much do you spend on clothes on a monthly basis?",
    number: "Question 1/5",
    style: "width: 20%",
  },
  {
    question: "On average, how much do you spend on fuel on a monthly basis?",
    number: "Question 2/5",
    style: "width: 40%",
  },
  {
    question: "On average, how much do you spend on electricity on a monthly basis?",
    number: "Question 3/5",
    style: "width: 60%",
  },
  {
    question: "On average, how much do you spend on compressed gas (for gaslit stoves, gaslit water heaters) on a monthly basis?",
    number: "Question 4/5",
    style: "width: 80%",
  },
  {
    question: "On average, how much do you spend on Amazon or other delivery retailers on a monthly basis?",
    number: "Question 5/5",
    style: "width: 100%",
  },
];

//vars used in the weather API calls
const WEATHER_API_URL = 'https://api.openweathermap.org/';
const WEATHER_API_KEY = '865284dc0e4d44eddd23a2592bd48d0a';
var weather = {};

//var used in the ClimatiqAPI calls
var headersList = {
  'Accept': '*/*',
  'Authorization': 'Bearer JVWEJDSK4P45TTN9JJPQ09BGZTX9',
  'Content-Type': 'application/json'
};
var parameters = {
  'money': 0,
  'money_unit': 'mxn'
};
var bodyContent;
var emissionAverage = 0;
var moneyAverage = 0;

//vars for results
var quizResults = [];
// var currentResult = {};


function setNextQuestion() {
  if (currentQuestion < 5) {
    showQuestion(questions[currentQuestion]);
  }
}

// Call the current question array
function showQuestion(question) {
  // Set the question text in the "main" title
  mainQuestion.innerHTML = question.question;
  // Set the question number in the "number" title
  questionNumber.innerHTML = question.number;
  // Change progressBar style, which in turn will make it bigger
  progressBar.style = question.style;
}

getStartedBtn.onclick = ()=> {
  currentQuestion = 0;
  surveyModal.style.display = "flex";
  dataModal.classList.remove("hidden");
  setNextQuestion();
};

nextBtn.addEventListener("click", (event)=> {
  if (event.target.id == 'nextSurveyBtn'){

  currentQuestion++;
  doAction();
  if (currentQuestion < 5) {
    setNextQuestion();
  } else {
    showResults();
  }
  if (currentQuestion == questions.length - 1) {
    nextBtn.innerHTML = "Complete";
  }
}
});

function showResults() {
  nextBtn.innerHTML = "Next";
  surveyModal.style.display = "none";
  document.getElementById("average").scrollIntoView({behavior: 'smooth'});
}

closeBtn.onclick = function () {
  surveyModal.style.display = "none";
}

lastBtn.onclick = function () {
  dataModal.classList.add("hidden");
}

window.onclick = function (event) {
  if (event.target == surveyModal) {
    surveyModal.style.display = "none";
  }
}

//Geolocation API
function getCityName() {

  let requestURL = WEATHER_API_URL + 'geo/1.0/reverse?lat=' + weather.latitude + '&lon=' + weather.longitude + '&limit=1' + '&appid=' + WEATHER_API_KEY;

  fetch(requestURL).then(function (response) {
    return response.json();
  }).then(function (data) {
    let weatherElement = document.getElementById('weather');

    weather.city = data[0].name;
    weatherElement.innerHTML = '<h1>' + weather.city + ' ' + weather.date + ' Temp: ' + weather.temp + '</h1> <img src="' + weather.icon +'"/>';

  })
}

function getLocationWeather(position) {

  let coordinates = position.coords;
  let requestURL = WEATHER_API_URL + 'data/2.5/onecall?lat=' + coordinates.latitude + '&lon=' + coordinates.longitude + '&units=metric' + '&appid=' + WEATHER_API_KEY;
  weather.latitude = coordinates.latitude;
  weather.longitude = coordinates.longitude;

  fetch(requestURL).then(function (response) {
    return response.json();
  }).then(function (data) {

    let date = new Date(data.current.dt * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    weather.date = day + '/' + month + '/' + year;
    weather.temp = data.current.temp + ' °C';
    weather.humidity = data.current.humidity;
    weather.icon = 'http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png';

    getCityName();
  });
}

//Call to get the location, then the weather for those coordinates;
navigator.geolocation.getCurrentPosition(getLocationWeather);

//Save and display results functions
function saveResults() {
  localStorage.setItem('results', JSON.stringify(quizResults))
}

function getLastResults() {

  let results = localStorage.getItem('results');

  if (results == null) {
    resultsSection.classList.add('hide');
  }
  else {
    renderResults();
  }
}

function renderResults() {

  let results = JSON.parse(localStorage.getItem('results'));
  console.log(results);

  for (let i = 1; i < 6; i++) {
    let header = document.getElementById('question-' + i);
    let moneySPent = document.getElementById('moneyspent-' + i);
    let emission = document.getElementById('result-' + i);

    header.textContent = results[i-1].question;
    moneySPent.textContent = results[i-1].money;
    emission.textContent = results[i-1].emissions;
  }
}

getLastResults();

//Functions to fetch the info from ClimatiqAPI
function doAction() {

  if (currentQuestion == 1) {
    getClothingEmissions()
  } else if (currentQuestion == 2) {
    getFuelEmissions()
  } else if (currentQuestion == 3) {
    getElectricityEmissions()
  } else if (currentQuestion == 4) {
    getGasEmissions()
  } else if (currentQuestion == 5) {
    getDeliveryServicesEmissions()
  }
}

function getdata(money) {

  fetch("https://beta3.api.climatiq.io/estimate", {
    method: "POST",
    body: bodyContent,
    headers: headersList
  }).then(function (response) {
    return response.json();
  }).then(function (data) {

    let emissionID = 'result-' + currentQuestion;
    let moneyID = 'moneyspent-' + currentQuestion;
    let result = document.getElementById(emissionID);
    let moneySpent = document.getElementById(moneyID);
    let category = '';
    let currentResult = {};

    switch (currentQuestion) {
      case 1: category = 'clothing';
        break;
      case 2: category = 'fuel';
        break;
      case 3: category = 'electricity';
        break;
      case 4: category = 'gas';
        break;
      case 5: category = 'delivery services';
        break;
    }

    result.textContent = data.constituent_gases.co2e_total.toFixed(2) + " CO2e/kg"
    moneySpent.textContent = "You spent " + money + " USD on " + category;
    emissionAverage = emissionAverage + data.constituent_gases.co2e_total;
    moneyAverage = moneyAverage + money;

    currentResult.question = questions[currentQuestion - 1].number;
    currentResult.money = moneySpent.textContent;
    currentResult.emissions = result.textContent;

    quizResults.push(currentResult);

    if (currentQuestion == 5) {
      calcAverageMoney();
      calcAverageEmissions();
      displayAverages();
      saveResults();
      resultsSection.classList.remove('hide');
    }

  }).catch(function (e) {
    console.log(e)
  })
}

function getClothingEmissions() {

  let money = moneyinput.value;
  money = parseInt(money);

  parameters.money = money;
  bodyContent = JSON.stringify({
    "emission_factor": "consumer_goods-type_clothing",
    parameters
  });

  getdata(money);
}

function getFuelEmissions() {

  let money = moneyinput.value
  money = parseInt(money);

  parameters.money = money;
  bodyContent = JSON.stringify({
    "emission_factor": "passenger_vehicle-vehicle_type_automobiles-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
    parameters
  });

  getdata(money);
}

function getElectricityEmissions() {

  let money = moneyinput.value;
  money = parseInt(money);

  parameters.money = money;
  bodyContent = JSON.stringify({
    "emission_factor": "electricity-energy_source_electricity",
    parameters
  });

  getdata(money);
}

function getGasEmissions() {

  let money = moneyinput.value;
  money = parseInt(money);

  parameters.money = money;
  bodyContent = JSON.stringify({
    "emission_factor": "fuel_type_natural_gas-fuel_use_na",
    parameters
  });

  getdata(money);
}

function getDeliveryServicesEmissions() {

  let money = moneyinput.value;
  money = parseInt(money);

  parameters.money = money;
  bodyContent = JSON.stringify({
    "emission_factor": "freight_vehicle-vehicle_type_na-fuel_source_na-vehicle_weight_na-percentage_load_na",
    parameters
  });

  getdata(money);
}

function calcAverageMoney(){
    let result = moneyAverage / 5;
    moneyAverage = result;
}

function calcAverageEmissions(){
  let result = emissionAverage / 5;
  emissionAverage = result;
}

function displayAverages(){
  average.textContent = "Your average money spent is " + moneyAverage + "USD. And your average emissions are " + emissionAverage.toFixed(2) + ' CO2e/kg';
}