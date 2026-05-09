// MENU TOGGLE
// HAMBURGER MENU
const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// FOOTER YEAR
document.querySelector("#year").textContent =
  new Date().getFullYear();

// LAST MODIFIED
document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

// COURSE ARRAY
const courses = [
  {
    code: "WDD 130",
    name: "Web Fundamentals",
    credits: 2,
    completed: true,
    type: "WDD"
  },
  {
    code: "WDD 131",
    name: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true,
    type: "WDD"
  },
  {
    code: "CSE 110",
    name: "Programming Building Blocks",
    credits: 2,
    completed: true,
    type: "CSE"
  },
  {
    code: "CSE 111",
    name: "Programming with Functions",
    credits: 2,
    completed: false,
    type: "CSE"
  },
  {
    code: "CSE 210",
    name: "Programming with Classes",
    credits: 2,
    completed: false,
    type: "CSE"
  }
];

// DISPLAY COURSES
function displayCourses(courseList) {
  const container = document.querySelector("#courseList");
  container.innerHTML = "";

  courseList.forEach(course => {
    const div = document.createElement("div");

    div.classList.add("course-card");

    if (course.completed) {
      div.classList.add("completed");
    }

    div.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>${course.credits} Credits</p>
    `;

    container.appendChild(div);
  });

  // TOTAL CREDITS
  const total = courseList.reduce(
    (sum, course) => sum + course.credits,
    0
  );

  document.querySelector("#totalCredits").textContent =
    `Total Credits: ${total}`;
}

// FILTER BUTTONS
document.querySelector("#allBtn").addEventListener("click", () => {
  displayCourses(courses);
});

document.querySelector("#wddBtn").addEventListener("click", () => {
  const filtered = courses.filter(course => course.type === "WDD");
  displayCourses(filtered);
});

document.querySelector("#cseBtn").addEventListener("click", () => {
  const filtered = courses.filter(course => course.type === "CSE");
  displayCourses(filtered);
});

// INITIAL DISPLAY
displayCourses(courses);