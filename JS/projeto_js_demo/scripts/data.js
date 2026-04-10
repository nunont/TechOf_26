
let USERS = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

function createNewUser(user) {
  USERS.push(user);
  localStorage.setItem("users", JSON.stringify(USERS));
}

function setLoggedInUser(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

function loginGuard() {
  let loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    alert("Please log in to access this page.");
    window.location.href = "login.html";
  }
}