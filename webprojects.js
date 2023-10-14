const web_projects_container = document.getElementById("web-projects")

window.onload = fetchData();

async function fetchData() {

    const response = await fetch('/webprojects.json');
    const data     = await response.json();

    data.forEach(obj => {
        const card       = document.createElement("div");
        const card_link  = document.createElement("a");
        const card_desc  = document.createElement("p");

        card.id = "card"

        card_link.textContent = obj.title;
        card_link.href        = obj.link;
        card_link.target       = "_"
        card_desc.textContent = obj.description;

        card.appendChild(card_link);
        card.appendChild(card_desc);

        web_projects_container.appendChild(card);
    });
}