function hasValue(input) {
  if (input.value.trim() === '') return false;
  else return true;
}

function error(input, message) {
  const elem = input.parentNode.querySelector("small");
  elem.innerText = message;
  input.className = 'error';
}

function success(input) {
  input.className = 'success';
  const elem = input.parentNode.querySelector("small");
  elem.innerText = '';
}

function validateInput(input, errorMsg) {
  if (hasValue(input)) {
    success(input);
    return true;
  } else {
    error(input, errorMsg);
    return false;
  }
}

function validateEmail(input, errorMsg, requiredMsg) {
  if (!hasValue(input)) {
    error(input, requiredMsg);
    return false;
  } else {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = input.value.trim();
    if (!emailRegex.test(email)) {
      error(input, errorMsg);
      return false;
    } else {
      success(input);
      return true;
    }
  }
}

function validateCheckboxes(input, errorMsg) {
  let isAnyChecked = false;
  input.forEach((checkbox) => {
    if (checkbox.checked) isAnyChecked = true;
  })
  if (!isAnyChecked) {
    const elem = document.getElementById('checkbox-error');
    elem.innerText = errorMsg;
    return false;
  } else {
    const elem = document.getElementById('checkbox-error');
    elem.innerText = '';
    return true;
  }
}

const form = document.forms[0];
const checkboxes = [
  document.getElementById('frontend-checkbox'),
  document.getElementById('backend-checkbox'),
  document.getElementById('mobile-checkbox'),
  document.getElementById('graphics-checkbox')
]

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let isFirstNameValid = validateInput(form.elements["first-name"], 'Proszę podać imię');
  let isLastNameValid = validateInput(form.elements["last-name"], 'Proszę podać nazwisko');
  let isEmailValid = validateEmail(form.elements["email"], "Nieprawidłowy adres email", "Proszę podać adres email");
  let isAnyCheckboxSet = validateCheckboxes(checkboxes, 'Proszę zaznaczyc co najmniej jedną sekcję')

  if (isFirstNameValid && isLastNameValid && isEmailValid && isAnyCheckboxSet) {
    window.location.href = './complete.html';
  }
});