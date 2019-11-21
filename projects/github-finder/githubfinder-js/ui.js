// Create UI class
class UI {
  constructor() {
    // Get HTML div element where profile data will be displayed
    this.profile = document.getElementById("profile");
  }

  // Show user profile with user info fetched
  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Website: ${user.blog}</li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member Since: ${user.created_at}</li>
          </ul>
          </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
    `;
  }

  // Show user repos
  showRepos(repos) {
    // Init empty string
    let output = "";
    // for each repo passed create HTML card
    repos.forEach(repo => {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
              <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${repo.watchers}</span>
              <span class="badge badge-success">Forks: ${repo.forks_count}</span>
            </div>
          </div>
        </div>
      `;
    });
    // If output is not empty get HTML element by id repos and display data
    if (output.length !== 0) {
      document.getElementById("repos").innerHTML = output;
    }
  }

  // Clear profile
  clearProfile() {
    this.profile.innerHTML = "";
  }

  // Show custom alert
  showAlert(message, className) {
    // Clear previous alerts
    this.clearAlert();
    // Create aler badge div
    const alertBadge = document.createElement("div");
    // Add alert class
    alertBadge.className = `alertCustom ${className}`;
    // Add alert text
    alertBadge.appendChild(document.createTextNode(message));
    // Get target part element
    const container = document.querySelector(".searchContainer");
    // Get target child element
    const search = document.querySelector(".search");
    // Insert alert div element inside target parent before target chilt
    container.insertBefore(alertBadge, search);
    // Remove alert after 3 seconds
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    // Get all existing alert class element
    const currentAlert = document.querySelector(".alertCustom");
    // If Alert class element exist - remove
    if (currentAlert) {
      currentAlert.remove();
    }
  }
}
