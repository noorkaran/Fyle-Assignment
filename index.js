const usernameInput = document.getElementById("username");
const fetchButton = document.getElementById("fetch-repos");
const repoList = document.getElementById("repo-list");
const profileImage = document.getElementById("profile-image");
const usernameDisplay = document.getElementById("username-display");

fetchButton.addEventListener("click", () => {
    const username = usernameInput.value;
    const url = `https://api.github.com/users/${username}/repos`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            repoList.innerHTML = "";
            data.forEach(repo => {
                //Add repositories
                const repoItem = document.createElement("li");
                const repoLink = document.createElement("a");
                repoLink.href = repo.html_url;
                repoLink.textContent = "Loading.......";
                repoItem.appendChild(repoLink);
                const skillsElement = document.createElement("span");
                skillsElement.classList.add("skills");
                const skills = repo.language ? repo.language : "No skills listed"; // Replace with your actual logic for determining skills
                skillsElement.textContent =skills;
                repoItem.appendChild(skillsElement);
                repoList.appendChild(repoItem);
                fetch(repo.url)
                    .then(response => response.json())
                    .then(repoDetails => {
                        repoLink.textContent = repoDetails.name;
                    })
            });
        })
    .catch(error => alert("Not Found!!!"));
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(user => {
            profileImage.src = user.avatar_url;
            profileImage.style.display = "inline";
            usernameDisplay.textContent = user.name;
        });
});
