const form = document.getElementById("entry-form");
const nameInput = document.getElementById("assignment-name");
const gradeInput = document.getElementById("assignment-grade");
const list = document.getElementById("assignment-list");
const gpaDisplay = document.getElementById("gpa");

let entries = JSON.parse(localStorage.getItem("entries")) || [];

function renderEntries() {
  list.innerHTML = "";
  entries.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.grade.toFixed(2)}`;
    list.appendChild(li);
  });
  updateGPA();
}

function updateGPA() {
  if (entries.length === 0) {
    gpaDisplay.textContent = "0.00";
    return;
  }
  const total = entries.reduce((sum, entry) => sum + entry.grade, 0);
  const gpa = total / entries.length;
  gpaDisplay.textContent = gpa.toFixed(2);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

  if (name && !isNaN(grade) && grade >= 0 && grade <= 5) {
    entries.push({ name, grade });
    localStorage.setItem("entries", JSON.stringify(entries));
    renderEntries();
    nameInput.value = "";
    gradeInput.value = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    console.log("All Entries:", entries);
  }
});

// Initial render
renderEntries();

