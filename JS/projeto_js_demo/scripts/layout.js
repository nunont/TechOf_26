
createNavbar();
function createNavbar() {
  let loggedInUser = getLoggedInUser();
  let userName = loggedInUser ? loggedInUser.firstName : "Guest";

  let html = `
    <div id="navbar">
        <div id="logo-section">
            <img src="" alt="Logo">
            <span>Welcome, ${userName}</span>
        </div>
        <div id="nav-links">
            <a href="./index.html">Home</a>
            <a href="./all-flats.html">All Flats</a>
            <a href="./new-flat.html">New Flat</a>`;

  if (!loggedInUser) {
    html += `
            <a href="./login.html">Login</a>
            <a href="./register.html">Register</a>`;
  }
  
  html += `
        </div>
        <div id="logout-section">
            <a href="./profile.html">Profile</a>
            <button onclick="logout()">Logout</button>
        </div>
    </div>`;

  document.body.insertAdjacentHTML("afterbegin", html);

}