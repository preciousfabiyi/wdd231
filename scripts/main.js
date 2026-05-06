// MENU TOGGLE
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// FOOTER DATES
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// COURSE DATA
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD131", name: "Dynamic Web", credits: 3, completed: true },
  { code: "CSE111", name: "Programming", credits: 3, completed: false },
  { code: "CSE210", name: "Software Design", credits: 3, completed: false }
];

// DISPLAY COURSES
function displayCourses(courseArray) {
  const container = document.getElementById("courseList");
  container.innerHTML = "";

  courseArray.forEach(course => {
    container.innerHTML += `
      <div class="course ${course.completed ? "completed" : ""}">
        ${course.code}
      </div>
    `;
  });

  // TOTAL CREDITS
  const total = courseArray.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById("totalCredits").textContent =
    `Total Credits: ${total}`;
}

// FILTER BUTTONS
document.getElementById("allBtn").onclick = () => displayCourses(courses);
document.getElementById("wddBtn").onclick =
  () => displayCourses(courses.filter(c => c.code.includes("WDD")));
document.getElementById("cseBtn").onclick =
  () => displayCourses(courses.filter(c => c.code.includes("CSE")));

// INITIAL LOAD
displayCourses(courses);