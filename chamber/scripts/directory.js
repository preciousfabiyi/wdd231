const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

/* MOBILE MENU */

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    menuButton.classList.toggle("open");
});

/* MEMBERS DATA */

const membersData = [

    {
        name: "TechNova Solutions",
        address: "12 Marina Road, Lagos",
        phone: "+234 801 111 1111",
        website: "https://technova.com",
        image: "images/business1.jpg",
        membership: "Gold"
    },

    {
        name: "GreenLife Foods",
        address: "45 Lekki Phase 1",
        phone: "+234 802 222 2222",
        website: "https://greenlifefoods.com",
        image: "images/business2.jpg",
        membership: "Silver"
    },

    {
        name: "Prime Bank",
        address: "18 Victoria Island",
        phone: "+234 803 333 3333",
        website: "https://primebank.com",
        image: "images/business3.jpg",
        membership: "Gold"
    },

    {
        name: "Urban Fashion Hub",
        address: "77 Ikeja City Mall",
        phone: "+234 804 444 4444",
        website: "https://urbanfashion.com",
        image: "images/business4.jpg",
        membership: "Member"
    },

    {
        name: "Skyline Travels",
        address: "20 Airport Road",
        phone: "+234 805 555 5555",
        website: "https://skyline.com",
        image: "images/business5.jpg",
        membership: "Silver"
    },

    {
        name: "BlueWave Media",
        address: "31 Yaba Tech District",
        phone: "+234 806 666 6666",
        website: "https://bluewave.com",
        image: "images/business6.jpg",
        membership: "Gold"
    },

    {
        name: "FreshMart Stores",
        address: "10 Surulere Avenue",
        phone: "+234 807 777 7777",
        website: "https://freshmart.com",
        image: "images/business7.jpg",
        membership: "Member"
    }

];

/* DISPLAY MEMBERS */

function displayMembers() {

    membersData.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="${member.image}" 
                 alt="${member.name}"
                 loading="lazy"
                 width="220"
                 height="180">

            <div>
                <h3>${member.name}</h3>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p><strong>${member.membership}</strong> Member</p>

                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </div>
        `;

        membersContainer.appendChild(card);

    });
}

/* LOAD MEMBERS */

displayMembers();

/* GRID VIEW */

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid-view");

    membersContainer.classList.remove("list-view");

});

/* LIST VIEW */

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list-view");

    membersContainer.classList.remove("grid-view");

});

/* FOOTER */

document.querySelector("#year").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;
