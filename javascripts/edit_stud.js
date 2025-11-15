// default students array
import { students as default_students } from "../data/students.js";

if (!localStorage.getItem("students")) {
  localStorage.setItem("students", JSON.stringify(default_students));
}

// Load existing students from localStorage or start with empty array
let students = JSON.parse(localStorage.getItem("students")) || [];

const studentList = document.getElementById("student-list");
const newStudentInput = document.getElementById("new-student");

function renderStudents() {
  studentList.innerHTML = ""; // Clear current list in UI

  students.forEach((student, index) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.value = student;
    input.addEventListener("input", (e) => {
      students[index] = e.target.value; // Edit student name
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      students.splice(index, 1);
      renderStudents();
    };

    li.appendChild(input);
    li.appendChild(deleteBtn);
    studentList.appendChild(li);
  });
}

document.getElementById("add-btn").addEventListener("click", () => {
  const newStudent = newStudentInput.value.trim();

  if (newStudent) {
    students.push(newStudent);
    newStudentInput.value = "";
    renderStudents();
  } else {
    alert("Please enter a valid student name.");
  }
});

document.getElementById("save-btn").addEventListener("click", () => {
  localStorage.setItem("students", JSON.stringify(students));
  alert("Student list saved!");
});

document.getElementById("clear-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all students?")) {
    students = [];
    localStorage.removeItem("students");
    renderStudents();
  }
});

// Initial render on page load
renderStudents();
