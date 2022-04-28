var getStartedBtn = document.getElementById("getStartedBtn")
var surveyModal = document.getElementById("surveyModal")
var closeBtn = document.getElementById("closeSurveyBtn")
var nextBtn = document.getElementById("nextSurveyBtn")
var questionNumber = document.querySelector("#questionLabel");
var mainQuestion = document.querySelector("#mainQuestion");
var moneyinput = document.querySelector("#money")
var progressBar = document.querySelector("#progressBar");
var average = document.getElementById("average");

//vars for questions
var currentQuestion = 0;
const questions = [
  {
    question: "On average, how much do you spend on clothes on a monthly basis?",
    number: "Question 1/5",
    id: "dataWeWillFetch",
    style: "width: 20%",
  },
  {
    question: "On average, how much do you spend on fuel on a monthly basis?",
    number: "Question 2/5",
    id: "dataWeWillFetch",
    style: "width: 40%",
  },
  {
    question: "On average, how much do you spend on electricity on a monthly basis?",
    number: "Question 3/5",
    id: "dataWeWillFetch",
    style: "width: 60%",
  },
  {
    question: "On average, how much do you spend on compressed gas (for gaslit stoves, gaslit water heaters) on a monthly basis?",
    number: "Question 4/5",
    id: "dataWeWillFetch",
    style: "width: 80%",
  },
  {
    question: "On average, how much do you spend on Amazon or other delivery retailers on a monthly basis?",
    number: "Question 5/5",
    id: "dataWeWillFetch",
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
var emissionAverage = "";
var moneyAverage = "";
var emissionOne  = ""
var emissionTwo= "";
var emissionThree= "";
var emissionFour= "";
var emissionFive= "";
var calcAverageOne = "";
var calcAverageTwo = "";
var calcAverageThree = "";
var calcAverageFour = "";
var calcAverageFive = "";


function setNextQuestion() {

  if (currentQuestion < 5) {
    showQuestion(questions[currentQuestion]);
  }
  else {
    showFinishMessage()
  }
}
// Call the current question array
function showQuestion(question) {
  // Set the question text in the "main" title
  mainQuestion.textContent = question.question;
  // Set the question number in the "number" title
  questionNumber.textContent = question.number;
  // Change progressBar style, which in turn will make it bigger
  progressBar.style = question.style;
}

function showFinishMessage() {
  questionNumber.textContent = 'All set!';
  mainQuestion.textContent = 'Click the finish button to check your results';
  nextBtn.innerHTML = 'Finish';
}

nextBtn.addEventListener("click", (event) => {
  if (event.target.id == 'nextSurveyBtn') {

    currentQuestion++;
    doAction();
    if (currentQuestion < 5) {
      setNextQuestion();
    }
  }
}
);

getStartedBtn.onclick = function () {
  surveyModal.style.display = "flex";
  setNextQuestion();
}

closeBtn.onclick = function () {
  surveyModal.style.display = "none";
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

//Functions to fetch the info from ClimatiqAPI
var clsbtn = document.getElementById("closeSurveyBtn")

// var clickState = 0;

function doAction() {
  // clickState++;

  if (currentQuestion == 1) {
    one()
  } else if (currentQuestion == 2) {
    two()
  } else if (currentQuestion == 3) {
    three()
  } else if (currentQuestion == 4) {
    four()
  } else if (currentQuestion == 5) {
    five()
    // then reset clickState for the next go round
    // clickState = 0;
  }
  clsbtn.addEventListener("click", doActionTwo)
  function doActionTwo() {

    if (currentQuestion > 5) {
      five()
    }
    console.log("test")
  }

}

function one() {
  console.log("testing 1")
  let money = moneyinput.value;
  let moneyInt = parseInt(money);

  parameters.money = moneyInt;
  bodyContent = JSON.stringify({
    "emission_factor": "consumer_goods-type_clothing",
    parameters
  });

  function getdata() {
    console.log("testing 1.1")
    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      var resultone = document.getElementById("resultone")
      resultone.textContent = data.constituent_gases.co2e_total.toFixed(2) + " CO2e/kg"

      var moneyspentone = document.getElementById("moneyspentone")
      moneyspentone.textContent = "You spent " + money + " USD on clothing"

      emissionOne =  data.constituent_gases.co2e_total

    }).catch(function (e) {
      console.log(e)
    })
  }
  getdata()
  calcAverageOne = moneyInt
  
}

function two() {
  console.log("testing 2")

  let money = moneyinput.value
  let moneyInt = parseInt(money)

  parameters.money = moneyInt;
  bodyContent = JSON.stringify({
    "emission_factor": "passenger_vehicle-vehicle_type_automobiles-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
    parameters
  });

  function getdata() {
    console.log("testing 2.1")

    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      var resulttwo = document.getElementById("resulttwo")
      resulttwo.textContent = data.constituent_gases.co2e_total.toFixed(2) + " CO2e/kg"

      var moneyspenttwo = document.getElementById("moneyspenttwo")
      moneyspenttwo.textContent = "You spent " + money + " USD on fuel"

      emissionTwo =  data.constituent_gases.co2e_total
    }).catch(function (e) {
      console.log(e)
    })
  }
  getdata()
  calcAverageTwo = moneyInt
}


function three() {
  console.log("testing 3");
  let money = moneyinput.value;
  let moneyInt = parseInt(money);

  parameters.money = moneyInt;
  bodyContent = JSON.stringify({
    "emission_factor": "electricity-energy_source_electricity",
    parameters
  });

  function getdata() {
    console.log("testing 3.1")

    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      var resultthree = document.getElementById("resultthree")
      resultthree.textContent = data.constituent_gases.co2e_total.toFixed(2) + " CO2e/kg"

      var moneyspenthree = document.getElementById("moneyspentthree")
      moneyspentthree.textContent = "You spent " + money + " USD on electricity"

      emissionThree =  data.constituent_gases.co2e_total

    }).catch(function (e) {
      console.log(e)
      
    })
  }
  getdata()
  calcAverageThree = moneyInt
}


function four() {
  console.log("testing 4")
  let money = moneyinput.value;
  let moneyInt = parseInt(money);

  parameters.money = moneyInt;
  bodyContent = JSON.stringify({
    "emission_factor": "fuel_type_natural_gas-fuel_use_na",
    parameters
  });

  function getdata() {
    console.log("testing 4.1")

    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      var resultfour = document.getElementById("resultfour")
      resultfour.textContent = data.constituent_gases.co2e_total.toFixed(2) + " CO2e/kg"

      var moneyspentfour = document.getElementById("moneyspentfour")
      moneyspentfour.textContent = "You spent " + money + " USD on gas"

      emissionFour =  data.constituent_gases.co2e_total

    }).catch(function (e) {
      console.log(e)
    })
  }
  getdata()
  calcAverageFour = moneyInt
}

function five() {
  console.log("testing 5")

  let money = moneyinput.value;
  let moneyInt = parseInt(money);

  parameters.money = moneyInt;
  bodyContent = JSON.stringify({
    "emission_factor": "freight_vehicle-vehicle_type_na-fuel_source_na-vehicle_weight_na-percentage_load_na",
    parameters
  });

  function getdata() {
    console.log("testing 5.1")

    fetch("https://beta3.api.climatiq.io/estimate", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);

      var resultfive = document.getElementById("resultfive")
      resultfive.textContent = data.constituent_gases.co2e_total.toFixed(2) + " CO2e/kg"

      var moneyspentfive = document.getElementById("moneyspentfive")
      moneyspentfive.textContent = "You spent " + money + " USD in delivery services"

      emissionFive =  data.constituent_gases.co2e_total

    }).catch(function (e) {
      console.log(e)
    })
  }
  getdata()
  calcAverageFive = moneyInt
  calcAverageMoney()
  calcAverageEmissions()
  displayAverages()
}

function calcAverageMoney(){

    let result = (calcAverageOne + calcAverageTwo + calcAverageThree + calcAverageFour + calcAverageFive) / 5;
    console.log("average money result (in function)" + result);
    moneyAverage = result;
}

function calcAverageEmissions(){
  let result = (emissionOne + emissionTwo + emissionThree + emissionFour + emissionFive) / 5;
  console.log("average emission result (in function)" + result);
  emissionAverage = result;
}

function displayAverages(){
  average.textContent = "your average money spent is " + moneyAverage + "USD. and your average emissions are " + emissionAverage.toFixed(2)
}