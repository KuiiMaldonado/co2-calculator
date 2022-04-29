
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

getStartedBtn.onclick = function () {
  surveyModal.style.display = "flex";
  setNextQuestion();
}

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

nextBtn.addEventListener("click", ()=> {

  if (currentQuestion == questions.length - 2) {
    currentQuestion++; 
    nextBtn.innerHTML = "Complete";
    four();
    setNextQuestion();
  } else if (currentQuestion +1 == questions.length) {
    five();
    currentQuestion = 0;
    nextBtn.innerHTML = "Next";
    showResults();
  } else {

    if (currentQuestion == 0) {
      one();
      currentQuestion++;
      setNextQuestion();
    } else if (currentQuestion == 1) {
      two();
      currentQuestion++;
      setNextQuestion();
    } else if (currentQuestion == 2) {
      three();
      currentQuestion++;
      setNextQuestion();
    }
  }
});

function showResults() {
  surveyModal.style.display = "none";
  document.getElementById("average").scrollIntoView({behavior: 'smooth'});
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


// var nextbtn = document.getElementById("nextSurveyBtn")
// var clsbtn = document.getElementById("closeSurveyBtn")

// nextbtn.addEventListener("click", doAction)
// var clickState = 0;

// function doAction() {
//   clickState++;

//   if (clickState == 1) {
//     one()
//   } else if (clickState == 2) {
//     two()
//   } else if (clickState == 3) {
//     three()
//   } else if (clickState == 4) {
//     four()
//   } else if (clickState == 5) {
//     five()
//     // then reset clickState for the next go round
//     clickState = 0;
//   }
//   clsbtn.addEventListener("click", doActionTwo)
//   function doActionTwo() {

//     if (clickState > 5) {
//       five()
//     }
//     console.log("test")
//   }

// }


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
      resultone.textContent = data.constituent_gases.co2e_total.toFixed(2) + " CO2e/kg"

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

function two() {
  console.log("testing 2")

  var moneyinput = document.querySelector("#money")
  var money = moneyinput.value
  var moneynumbertwo = parseInt(money)

  let headersList = {
    "Accept": "*/*",
    "Authorization": "Bearer JVWEJDSK4P45TTN9JJPQ09BGZTX9",
    "Content-Type": "application/json"
  }
  let bodyContent = JSON.stringify({

    "emission_factor": "passenger_vehicle-vehicle_type_automobiles-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na",
    "parameters": {
      "money": moneynumbertwo,
      "money_unit": "mxn"
    }
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
  calcAverageTwo = moneynumbertwo
}

function three() {
  console.log("testing 3")

  var moneyinput = document.querySelector("#money")
  var money = moneyinput.value
  var moneynumberthree = parseInt(money)
  
  

  let headersList = {
    "Accept": "*/*",
    "Authorization": "Bearer JVWEJDSK4P45TTN9JJPQ09BGZTX9",
    "Content-Type": "application/json"
  }
  let bodyContent = JSON.stringify({

    "emission_factor": "electricity-energy_source_electricity",
    "parameters": {
      "money": moneynumberthree,
      "money_unit": "mxn"
    }
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
  calcAverageThree = moneynumberthree
}

function four() {
  console.log("testing 4")

  var moneyinput = document.querySelector("#money")
  var money = moneyinput.value
  var moneynumberfour = parseInt(money)
  

  let headersList = {
    "Accept": "*/*",
    "Authorization": "Bearer JVWEJDSK4P45TTN9JJPQ09BGZTX9",
    "Content-Type": "application/json"
  }
  let bodyContent = JSON.stringify({

    "emission_factor": "fuel_type_natural_gas-fuel_use_na",
    "parameters": {
      "money": moneynumberfour,
      "money_unit": "mxn"
    }
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
  calcAverageFour = moneynumberfour
}

function five() {
  console.log("testing 5")

  var moneyinput = document.querySelector("#money")
  var money = moneyinput.value
  var moneynumberfive = parseInt(money)

  let headersList = {
    "Accept": "*/*",
    "Authorization": "Bearer JVWEJDSK4P45TTN9JJPQ09BGZTX9",
    "Content-Type": "application/json"
  }
  let bodyContent = JSON.stringify({

    "emission_factor": "freight_vehicle-vehicle_type_na-fuel_source_na-vehicle_weight_na-percentage_load_na",
    "parameters": {
      "money": moneynumberfive,
      "money_unit": "mxn"
    }
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
  calcAverageFive = moneynumberfive
  calcAverageMoney()
  calcAverageEmissions()
  displayAverages()
}

var calcAverageOne = ""
var calcAverageTwo = ""
var calcAverageThree = ""
var calcAverageFour = ""
var calcAverageFive = ""

var average = document.getElementById("average")

function calcAverageMoney(){

    //average.textContent = calcAverageOne + calcAverageTwo +
    //calcAverageThree + calcAverageFour + calcAverageFive /5 ;

    //var averageCalcTest = moneynumberone + moneynumbertwo +
    //moneynumberthree + moneynumberfour + moneynumberfive / 5

    const result = (calcAverageOne + calcAverageTwo +
    calcAverageThree + calcAverageFour + calcAverageFive) /5 

    const resultTest = calcAverageOne + calcAverageTwo +
    calcAverageThree + calcAverageFour + calcAverageFive

    console.log(resultTest)

    console.log("average money result (in function)" + result)

    moneyAverage = result

    //console.log(calcAverageThree)

    //console.log(calcAverage)


}
var moneyAverage = ""

var emissionOne  = ""
var emissionTwo= ""
var emissionThree= ""
var emissionFour= ""
var emissionFive= ""

function calcAverageEmissions(){
  const result = (emissionOne + emissionTwo +
  emissionThree + emissionFour + emissionFive) /5

  const resultTest = emissionOne + emissionTwo +
  emissionThree + emissionFour + emissionFive

  console.log(resultTest)

  console.log("average emission result (in function)" + result)

    emissionAverage = result
}

var emissionAverage = ""

function displayAverages(){
  average.textContent = "Your average money spent is " + moneyAverage + "USD. And your average emissions are " + emissionAverage.toFixed(2)
}