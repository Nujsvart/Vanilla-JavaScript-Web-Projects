"use strict";
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

// Input Basarili
const showSuccess = function (input) {
  const formControl = input.closest(".form-control");
  formControl.classList.remove("error");
  formControl.classList.add("success");
};
// Input Hatali
const showError = function (input, message) {
  const formControl = input.closest(".form-control");
  formControl.classList.add("error");
  formControl.querySelector("small").textContent = message;
};

const getFieldName = function (input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

//********************************************************* */

// Submit edildiginde required olanlari kontrol et
const checkRequired = function (inputArr) {
  return inputArr.forEach(el => {
    el.value.trim() === ""
      ? showError(el, `${getFieldName(el)} is required!`)
      : showSuccess(el);
  });
};

// Input length'i kontrol et
const checkLength = function (input, min, max) {
  input.value.length < min
    ? showError(input, `${getFieldName(input)} must be at least ${min}`)
    : input.value.length > max
    ? showError(input, `${getFieldName(input)} must be less than ${max}`)
    : showSuccess(input);
};

// Maili kontrol et
const checkEmail = function (email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.value.trim())
    ? showSuccess(email)
    : showError(email, `Email is not valid`);
};

// Password'u kontrol et
const checkPasswordMatch = function (input1, input2) {
  if (input1.value !== input2.value)
    showError(input2, `Passwords do not match`);
};

//***************************************************************** */

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
