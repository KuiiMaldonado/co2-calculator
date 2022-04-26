let getStartedBtn = document.getElementById("getStartedBtn")
let surveyModal = document.getElementById("surveyModal")
let closeBtn = document.getElementById("closeSurveyBtn")
let nextBtn = document.getElementById("nextSurveyBtn")
let questionNumber = document.querySelector("#questionLabel");
let mainQuestion = document.querySelector("#mainQuestion");
let progressBar = document.querySelector("#progressBar");

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

nextBtn.addEventListener("click", ()=> {
  currentQuestion++;
  // getData();
  setNextQuestion();
}
);

getStartedBtn.onclick = function () {
  surveyModal.style.display = "block";
  setNextQuestion();
}


closeBtn.onclick = function () {
  surveyModal.style.display = "none";
}