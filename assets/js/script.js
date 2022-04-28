
let getStartedBtn = document.getElementById("getStartedBtn")
let surveyModal = document.getElementById("surveyModal")
let closeBtn = document.getElementById("closeSurveyBtn")
let nextBtn = document.getElementById("nextSurveyBtn")
let questionNumber = document.querySelector("#questionLabel");
let mainQuestion = document.querySelector("#mainQuestion");
let progressBar = document.querySelector("#progressBar");

const WEATHER_API_URL = 'https://api.openweathermap.org/';
const WEATHER_API_KEY = '865284dc0e4d44eddd23a2592bd48d0a';

var weather = {};
let currentQuestion = 0;

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

function setNextQuestion() {
  showQuestion(questions[currentQuestion]);
};
// Call the current question array
function showQuestion(question) {
  // Set the question text in the "main" title
  mainQuestion.innerHTML = question.question;
  // Set the question number in the "number" title
  questionNumber.innerHTML = question.number;
  // Change progressBar style, which in turn will make it bigger
  progressBar.style = question.style;
};

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  // getData();
  setNextQuestion();
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


var nextbtn = document.getElementById("nextSurveyBtn")
var clsbtn = document.getElementById("closeSurveyBtn")

nextbtn.addEventListener("click", doAction)
var clickState = 0;

function doAction() {
  clickState++;

  if (clickState == 1) {
    one()
  } else if (clickState == 2) {
    two()
  } else if (clickState == 3) {
    three()
  } else if (clickState == 4) {
    four()
  } else if (clickState == 5) {
    five()
    // then reset clickState for the next go round
    clickState = 0;
  }
  clsbtn.addEventListener("click", doActionTwo)
  function doActionTwo() {

    if (clickState > 5) {
      five()
    }
    console.log("test")
  }

}





function one() {
  console.log("testing 1")

  var moneyinput = document.querySelector("#money")
  var money = moneyinput.value
  var moneynumberone = parseInt(money)

  //function setAmount(){
  //  calcAverageOne = moneynumberone
  //}
  

  console.log("money amount selected (as string)" + money)
  console.log(moneynumberone)

  let headersList = {
    "Accept": "*/*",
    "Authorization": "Bearer JVWEJDSK4P45TTN9JJPQ09BGZTX9",
    "Content-Type": "application/json"
  }
  let bodyContent = JSON.stringify({

    "emission_factor": "consumer_goods-type_clothing",
    "parameters": {
      "money": moneynumberone,
      "money_unit": "mxn"
    }
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
      resultone.textContent = data.constituent_gases.co2e_total + " CO2e/kg"

      var moneyspentone = document.getElementById("moneyspentone")
      moneyspentone.textContent = "You spent " + money + " USD on clothing"

      emissionOne =  data.constituent_gases.co2e_total

    }).catch(function (e) {
      console.log(e)
    })
  }
  getdata()
  calcAverageOne = moneynumberone
  
}