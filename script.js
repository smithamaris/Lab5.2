// Select all necessary DOM elements
const form = document.querySelector('.container-registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');

// Load saved username: On page load, check if a username is saved in localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    username.value = savedUsername;
  }
});

// Generic field validation function
function validateField(input, errorSpan) {
  let message = '';

  // Use the Constraint Validation API
  if (input.validity.valueMissing) {
    message = 'This field is required';
  } else if (input.validity.tooShort) {
    message = `Must be at least ${input.minLength} characters`;
  } else if (input.validity.typeMismatch && input.type === 'email') {
    message = 'Please enter a valid email (e.g., name@example.com)';
  }

  // Rule For the “Confirm Password” field, to check if it matches the “Password” field
  if (input === confirmPassword && confirmPassword.value !== password.value) {
    message = 'Passwords do not match';
  }

  // Display custom error messages in the corresponding <span> elements.
  errorSpan.textContent = message;
  return message === ''; // true if valid
}

// Real-time validation
username.addEventListener('input', () => validateField(username, usernameError));
email.addEventListener('input', () => validateField(email, emailError));
password.addEventListener('input', () => validateField(password, passwordError));
confirmPassword.addEventListener('input', () =>
  validateField(confirmPassword, confirmPasswordError)
);

// Form submission: Add a submit event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate all fields
  const isUsernameValid = validateField(username, usernameError);
  const isEmailValid = validateField(email, emailError);
  const isPasswordValid = validateField(password, passwordError);
  const isConfirmValid = validateField(confirmPassword, confirmPasswordError);

  if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
    // Save username to localStorage
    localStorage.setItem('username', username.value);

    alert('Registration successful!');
    form.reset();

    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
  } else {
    // Focus the first invalid field
    if (!isUsernameValid) {
      username.focus();
    } else if (!isEmailValid) {
      email.focus();
    } else if (!isPasswordValid) {
      password.focus();
    } else {
      confirmPassword.focus();
    }
  }
});