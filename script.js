let getStartedBtn = document.getElementById("getStartedBtn")
let surveyModal = document.getElementById("surveyModal")
let closeBtn = document.getElementById("closeSurveyBtn")
let nextBtn = document.getElementById("nextSurveyBtn")


getStartedBtn.onclick = function () {
  surveyModal.style.display = "block";
}


closeBtn.onclick = function () {
  surveyModal.style.display = "none";
}