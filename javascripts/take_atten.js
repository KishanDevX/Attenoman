export const students = [
  "Aadesh Srivastava",
  "Anik Jafar",
  "Aadarsh Modanwal",
  "Ali Hamid",
  "Amandeep Yadav",
  "Anishka Pal",
  "Arpit Tripathi",
  "Arya Singh",
  "Aayush Kesarvani",
  "Bhanu Pratap",
  "Iqra Khan",
  "Faizan Khan",
  "Fiza Anis",
  "Harsh Gupta",
  "Hrithik Singh",
  "Indresh Singh",
  "Insha",
  "Naman Soni",
  "Om Prakash Sahu",
  "Pooja Kumari",
  "Pushparaj",
  "Ramkrishna Pandey",
  "Rishant Singh",
  "Rishu Dubey",
  "Satyansh Shrivastav",
  "Sayon Manna",
  "Shivam Singh",
  "Shivam Yadav",
  "Shreeji Kesarvani",
  "Shreya Gupta",
  "Shyama Kasera",
  "Smriti Prajapati",
  "Soniya Mandal",
  "Tannu Gupta",
  "Tanushree Yadav",
  "Utkarsh Dubey",
  "Vaidehi Singh",
  "Vishwas Pandey",
  "Zoya Khan",
];

const ordered_students = students.sort();

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
  if (idx == ordered_students.length) {
    console.log("pres: ", present_list);
    console.log("abs: ", absent_list);
    document.body.innerHTML = `
      <div id="done-screen">
        <h1>Attendance Taken Successfully!</h1>
        <button id="copy-btn">copy text record</button>
        <a id="send-btn">send it now!</a>
      </div>
    `;

    let record = `Name of all *PRESENT students* \non *${get_date()}*:\n\n`;
    present_list.forEach((name, index) => {
      record += ` • ${name}\n`;
    });

    record += `\n*Total students: ${ordered_students.length}*\n`;
    record += `*Present:* ${present_list.length}\n`;
    record += `*Absent:* ${absent_list.length}\n\n`;

    const send_btn = document.getElementById("send-btn");
    const whatsapp_url = `https://wa.me/?text=${encodeURIComponent(record)}`;
    send_btn.setAttribute("href", whatsapp_url);
    send_btn.setAttribute("target", "_blank");
    send_btn.innerText = "Send it via WhatsApp";

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

present.addEventListener("click", () => {
  present_list.push(name_elem.innerText);
  next_student();
  isDone_check();
});

absent.addEventListener("click", () => {
  absent_list.push(name_elem.innerText);
  next_student();
  isDone_check();
});

// starting point
next_student();
