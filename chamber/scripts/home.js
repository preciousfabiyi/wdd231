const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");
});

// FOOTER

document.querySelector("#year").textContent =
new Date().getFullYear();

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;

// WEATHER API

const apiKey = "YOUR_API_KEY";
const lat = 6.5244;
const lon = 3.3792;

const weatherURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function getWeather() {

  try{

    const response = await fetch(weatherURL);

    const data = await response.json();

    document.querySelector("#current-temp").textContent =
    `${data.list[0].main.temp}°C`;

    document.querySelector("#weather-desc").textContent =
    data.list[0].weather[0].description;

    const forecast = document.querySelector("#forecast");

    forecast.innerHTML = "";

    for(let i = 8; i <= 24; i += 8){

      const day = data.list[i];

      const p = document.createElement("p");

      p.textContent =
      `${day.dt_txt.split(" ")[0]}: ${day.main.temp}°C`;

      forecast.appendChild(p);
    }

  }

  catch(error){
    console.log(error);
  }
}

getWeather();

// SPOTLIGHTS

const spotlightContainer =
document.querySelector("#spotlight-container");

const membersURL = "data/members.json";

async function getSpotlights(){

  const response = await fetch(membersURL);

  const data = await response.json();

  const filteredMembers =
  data.members.filter(member =>
    member.membership === "Gold" ||
    member.membership === "Silver"
  );

  const randomMembers =
  filteredMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

  displaySpotlights(randomMembers);
}

function displaySpotlights(members){

  members.forEach(member => {

    const card = document.createElement("div");

    card.classList.add("spotlight-card");

    card.innerHTML = `
      <h3>${member.name}</h3>

      <img src="${member.image}"
      alt="${member.name} Logo">

      <p>${member.address}</p>

      <p>${member.phone}</p>

      <p>
        <a href="${member.website}" target="_blank">
          Visit Website
        </a>
      </p>

      <p>
        Membership:
        ${member.membership}
      </p>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();