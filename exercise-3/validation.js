// validation.js

// LOGIN VALIDATION
function validateLogin() {
  let valid = true;

  const username = document.getElementById("loginUsername");
  const password = document.getElementById("loginPassword");

  // Username check
  if (!username.value.trim()) {
    username.classList.add("is-invalid");
    valid = false;
  } else {
    username.classList.remove("is-invalid");
  }

  // Password check
  if (password.value.length < 6) {
    password.classList.add("is-invalid");
    valid = false;
  } else {
    password.classList.remove("is-invalid");
  }

  // If valid, redirect
  if (valid) {
    window.location.href = "catalog.html";
  }

  return false; // prevent default form submit
}


// REGISTER VALIDATION
function validateRegister() {
  let valid = true;

  const username = document.getElementById("regUsername");
  const email = document.getElementById("regEmail");
  const password = document.getElementById("regPassword");

  // Username check
  if (!username.value.trim()) {
    username.classList.add("is-invalid");
    valid = false;
  } else {
    username.classList.remove("is-invalid");
  }

  // Email check
  if (!email.checkValidity()) {
    email.classList.add("is-invalid");
    valid = false;
  } else {
    email.classList.remove("is-invalid");
  }

  // Password check
  if (password.value.length < 6) {
    password.classList.add("is-invalid");
    valid = false;
  } else {
    password.classList.remove("is-invalid");
  }

  // If valid, redirect to login
  if (valid) {
    alert("Registration successful!");
    window.location.href = "login.html";
  }

  return false; // prevent default form submit
}
