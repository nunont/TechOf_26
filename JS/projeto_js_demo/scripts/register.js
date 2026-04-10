
let iFirstName = document.getElementById("firstName");
let iLastName = document.getElementById("lastName");
let iDateOfBirth = document.getElementById("dateOfBirth");
let iEmail = document.getElementById("email");
let iPassword = document.getElementById("password");
let iConfirmPassword = document.getElementById("confirmPassword");

function register() {
  let firstName = iFirstName.value;
  let lastName = iLastName.value;
  let dateOfBirth = iDateOfBirth.value;
  let email = iEmail.value;
  let password = iPassword.value;
  let confirmPassword = iConfirmPassword.value;

  if (!firstName  || !lastName || !dateOfBirth || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  //check if is 18 years old to 120 years old
  let today = new Date()
  let birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18 || age > 120) {
    alert("You must be between 18 and 120 years old to register.");
    return;
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (!hasLetter || !hasNumber || !hasSymbol || password.length < 6) {
    alert("Password must contain at least one letter, one number, and one symbol, and be at least 6 characters long.");
    return;
  }

  let userExists = USERS.some(user => user.email === email);
  if (userExists) {
    alert("Email already registered.");
    return;
  }

  const user = {
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    email: email,
    password: password
  };

  /* USERS.push(user);
  localStorage.setItem("users", JSON.stringify(USERS)); */
  createNewUser(user);
  alert("Registration successful!");
  window.location.href = "login.html";
}