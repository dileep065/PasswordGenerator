let isPasswordVisible = true;

function generatePassword() {
  const length = parseInt(document.getElementById("length").value);
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  const errorDiv = document.getElementById("error");
  const passwordDiv = document.getElementById("password");
  const strengthDiv = document.getElementById("strength");

  errorDiv.innerText = "";
  passwordDiv.innerText = "";
  strengthDiv.innerText = "";

  if (isNaN(length) || length < 8 || length > 64) {
    errorDiv.innerText = "Please enter a length between 8 and 64.";
    return;
  }

  if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
    errorDiv.innerText = "Please select at least one character type.";
    return;
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charPool = "";
  if (includeUpper) charPool += upper;
  if (includeLower) charPool += lower;
  if (includeNumbers) charPool += numbers;
  if (includeSymbols) charPool += symbols;

  let guaranteed = [];
  if (includeUpper) guaranteed.push(randomChar(upper));
  if (includeLower) guaranteed.push(randomChar(lower));
  if (includeNumbers) guaranteed.push(randomChar(numbers));
  if (includeSymbols) guaranteed.push(randomChar(symbols));

  let password = guaranteed.join('');
  for (let i = password.length; i < length; i++) {
    password += randomChar(charPool);
  }

  password = shuffleString(password);
  passwordDiv.innerText = password;

  const strength = getStrength(password);
  strengthDiv.innerText = "Strength: " + strength;
  strengthDiv.style.color = strength === "Strong" ? "lime" : strength === "Medium" ? "orange" : "red";
}

function randomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

function shuffleString(str) {
  return str.split('').sort(() => 0.5 - Math.random()).join('');
}

function getStrength(password) {
  let score = 0;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (password.length >= 12 && score >= 3) return "Strong";
  if (password.length >= 8 && score >= 2) return "Medium";
  return "Weak";
}

function copyPassword() {
  const password = document.getElementById("password").innerText;
  if (password) {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  }
}

function toggleVisibility() {
  const passwordDiv = document.getElementById("password");
  if (isPasswordVisible) {
    passwordDiv.style.color = "#282c34";
  } else {
    passwordDiv.style.color = "#f0f0f0";
  }
  isPasswordVisible = !isPasswordVisible;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
