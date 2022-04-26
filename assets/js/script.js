let getStartedBtn = document.getElementById("getStartedBtn")
let surveyModal = document.getElementById("surveyModal")
let closeBtn = document.getElementById("closeSurveyBtn")
let nextBtn = document.getElementById("nextSurveyBtn")


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