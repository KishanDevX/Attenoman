// load students from localStorage
const students = JSON.parse(localStorage.getItem("students")) || [];
const ordered_students = students.sort();

if (ordered_students.length === 0) {
  document.body.innerHTML = `
    <div id="no-students-screen">
      <h1 style="text-decoration: underline; color: red;">No students found!</h1>
      <p style="text-align: start; margin-top: 10px">Please add students first in the <br> <a href="../pages/edit_stud.html">Edit Students</a> section.</p>
    </div>
  `;
  throw new Error("No students available for attendance.");
}

// initialize
let present_list = [];
let absent_list = [];
let idx = 0;

// helper functions
function next_student() {
  name_elem.innerText = ordered_students[idx];
  roll_num.innerText = idx + 1;
  idx += 1;
}

function isDone_check() {
  if (idx == ordered_students.length + 1) {
    document.body.innerHTML = `
      <div id="done-screen">
        <h1>Attendance Taken Successfully!</h1>
        <a id="send-btn">
          <span>send it now!</span>
        </a>
        <button id="copy-btn">
          <span class="material-symbols-outlined">content_copy</span>
          <span>copy text record</span>
        </button>
      </div>
    `;

    let record = `Name of all *PRESENT students* \non *${get_date()}*:\n\n`;

    present_list.forEach((name) => {
      record += ` • ${name}\n`;
    });

    record += `\n*Total students:* ${ordered_students.length}\n*Present:* ${present_list.length}\n*Absent:* ${absent_list.length}\n`;

    // send via whatsapp
    const send_btn = document.getElementById("send-btn");
    Object.assign(send_btn, {
      href: `https://wa.me/?text=${encodeURIComponent(record)}`,
      target: "_blank",
      textContent: "Send it via WhatsApp",
    });

    // copy to clipboard
    const copy_btn = document.getElementById("copy-btn");
    copy_btn.addEventListener("click", () => {
      navigator.clipboard.writeText(record).then(
        () => {
          alert("Attendance record copied to clipboard!");
        },
        (err) => {
          alert("Failed to copy text: ", err);
        }
      );
    });
  }
}

function get_date() {
  const today = new Date();

  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const day = today.toLocaleString("en-US", { weekday: "long" });

  return `${day}, ${date}/${month}/${year}`;
}

// displays
const name_elem = document.getElementById("name");
const roll_num = document.getElementById("roll_num");

// buttons
const present = document.getElementById("present");
const absent = document.getElementById("absent");

// click sounds
const present_sound = new Audio("../media/audio/present.mp3");
const absent_sound = new Audio("../media/audio/absent.mp3");

// button event listeners
present.addEventListener("click", () => {
  present_sound.currentTime = 0;
  present_sound.play();
  present_list.push(name_elem.innerText);
  next_student();
  isDone_check();
});

absent.addEventListener("click", () => {
  absent_sound.currentTime = 0;
  absent_sound.play();
  absent_list.push(name_elem.innerText);
  next_student();
  isDone_check();
});

// starting point
next_student();
