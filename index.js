//navbarCol on navbar scroll
const header = document.querySelector('.navbar');

window.onscroll = function() {
    var top = window.scrollY;
    if(top >=100) {
        header.classList.add('navbarCol');
    }
    else {
        header.classList.remove('navbarCol');
    }
}

//constantly changing variables
const dt=new Date();

window.onload=function(){
    //age
    var age=dt.getFullYear()-2006;
    document.getElementById('age').innerHTML="Age: "+age;

    //Occupation
    document.getElementById('occu').innerHTML="Occupation: Student";

    fetchGitHubRepos();
    fetchGames();
    fetchLiveProjects();
}

//fetch GitHub repositories and display them in cards
async function fetchGitHubRepos() {
    const githubUserName = "JellyPumps";
    const reposUrl = `https://api.github.com/users/${githubUserName}/repos`;
    const response = await fetch(reposUrl);
    const repos = await response.json();
    //clear the container
    document.getElementById("github-repositories").innerHTML = "";
    //display the repositories in cards
    repos.forEach(repo => {
      const div = document.createElement("div");
      div.classList.add("card");
  
      div.innerHTML = `
        <img src="${repo.owner.avatar_url}" class="card-img-top" alt="${repo.name}">
        <div class="card-body">
          <h5 class="card-title">${repo.name}</h5>
          <p class="card-text">${repo.description}</p>
          <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
        </div>
      `;
  
      document.getElementById("github-repositories").appendChild(div);
    });
}

//fetch games from JSON file and display them in cards
async function fetchGames() {
    const response = await fetch("games.json");
    const games = await response.json();
    //clear the container
    document.getElementById("games-container").innerHTML = "";
    //display the games in cards
    games.forEach(game => {
      const div = document.createElement("div");
      div.classList.add("card");
  
      div.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${game.name}</h5>
          <p class="card-text">${game.description}</p>
          <a href="${game.url}" class="btn btn-primary" target="_blank">Play</a>
        </div>
      `;
  
      document.getElementById("games-container").appendChild(div);
    });
}

//fetch live projects from JSON file and display them
async function fetchLiveProjects() {
    const response = await fetch("live-projects.json");
    const liveProjects = await response.json();
    //clear the container
    document.getElementById("live-projects").innerHTML = "";
    //display the live projects
    liveProjects.forEach(project => {
        const div = document.createElement("div");
        div.classList.add("card");
    
        div.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${project.name}</h5>
            <p class="card-text">${project.description}</p>
            <a href="${project.url}" class="btn btn-primary" target="_blank">View Project</a>
          </div>
        `;
      document.getElementById("live-projects").appendChild(div);
    });
}

//show and hide divs within the portfolio section
function toggleDiv(divId) {
    const divs = ['career', 'github-repositories', 'games-container', 'live-projects'];
    // hide all divs first
    divs.forEach(div => {
        document.getElementById(div).style.display = "none";
    });
    // show the selected div
    document.getElementById(divId).style.display = "flex";
}

document.getElementById("career-button").addEventListener("click", function() {toggleDiv("career"); });
document.getElementById("github-repositories-button").addEventListener("click", function() {toggleDiv("github-repositories"); });
document.getElementById("games-button").addEventListener("click", function() {toggleDiv("games-container"); });
document.getElementById("live-projects-button").addEventListener("click", function() {toggleDiv("live-projects"); });
