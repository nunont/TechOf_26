
let iEmail = document.getElementById("email");
let iPassword = document.getElementById("password");

function login() {
  let email = iEmail.value;
  let password = iPassword.value;

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let user = USERS.find(user => user.email === email && user.password === password);
  if (user) {
    alert("Login successful!");
    /* localStorage.setItem("loggedInUser", JSON.stringify(user)); */
    setLoggedInUser(user);
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password.");
  }
}