// import * as errorView from "errorView.js";

const nextBtn = document.querySelector("#next");
const submitBtn = document.querySelector("#submit-btn");
const passwordInput = document.querySelector("#divPr");

const showPasswordInput = function (e) {
  e.preventDefault();
  passwordInput.style.display = "";
  nextBtn.style.display = "none";
  submitBtn.style.display = "";
};

nextBtn.addEventListener("click", showPasswordInput);
