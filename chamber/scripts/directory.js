const url = "data/members.json";

const membersContainer = document.querySelector("#members");

/* FETCH MEMBER DATA */

async function getMembers() {

    const response = await fetch(url);

    const data = await response.json();

    displayMembers(data.members);
}

/* DISPLAY MEMBERS */

const displayMembers = (members) => {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" 
                 alt="${member.name}" 
                 loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>Membership Level: ${member.membership}</p>

            <a href="${member.website}" target="_blank">
                Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
};

getMembers();

/* FOOTER */

document.querySelector("#year").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;

/* MOBILE NAVIGATION */

const menuButton = document.querySelector("#menu");

const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

    menuButton.classList.toggle("open");

});

/* GRID / LIST VIEW */

const gridButton = document.querySelector("#grid");

const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid-view");

    membersContainer.classList.remove("list-view");

});

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");

    membersContainer.classList.remove("grid-view");

});