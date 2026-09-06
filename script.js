const questions = [
  {
    q: "Which Quirk does Izuku Midoriya inherit from All Might?",
    a: ["One For All", "All For One", "Blackwhip", "Fa Jin"],
    c: 0
  },
  {
    q: "What is the main limitation of Katsuki Bakugo's Explosion Quirk?",
    a: ["It depends on his sweat", "It only works in darkness", "It requires water", "It can only affect metal"],
    c: 0
  },
  {
    q: "What is Shoto Todoroki's Quirk officially called?",
    a: ["Half-Cold Half-Hot", "Flashfire", "Frostfire", "Ice and Flame"],
    c: 0
  },
  {
    q: "Which U.A. teacher is known as Eraser Head?",
    a: ["Shota Aizawa", "Hizashi Yamada", "Nemuri Kayama", "Snipe"],
    c: 0
  },
  {
    q: "What is the name of the U.A. class that Midoriya belongs to?",
    a: ["Class 1-A", "Class 1-B", "Class 2-A", "Class 2-B"],
    c: 0
  },
  {
    q: "Which Quirk allows Fumikage Tokoyami to control a shadow-like being?",
    a: ["Dark Shadow", "Shadow Control", "Night Beast", "Black Tendril"],
    c: 0
  },
  {
    q: "What is Tenya Iida's Quirk?",
    a: ["Engine", "Turbo", "Speed", "Recipro"],
    c: 0
  },
  {
    q: "Which villain possesses the Quirk that can steal and transfer other Quirks?",
    a: ["All For One", "Tomura Shigaraki", "Dabi", "Kurogiri"],
    c: 0
  },
  {
    q: "What is Endeavor's real name?",
    a: ["Enji Todoroki", "Keigo Takami", "Toshinori Yagi", "Taishiro Toyomitsu"],
    c: 0
  },
  {
    q: "What is the name of the Quirk used by Hawks?",
    a: ["Fierce Wings", "Winged Hero", "Feather Storm", "Red Wings"],
    c: 0
  },
  {
    q: "Which student uses the Quirk Creation?",
    a: ["Momo Yaoyorozu", "Ochaco Uraraka", "Tsuyu Asui", "Kyoka Jiro"],
    c: 0
  },
  {
    q: "What does Ochaco Uraraka's Zero Gravity primarily do?",
    a: ["Removes the effect of gravity from touched objects", "Makes objects heavier", "Creates gravitational waves", "Pulls objects toward her"],
    c: 0
  },
  {
    q: "Which Quirk belongs to Eijiro Kirishima?",
    a: ["Hardening", "Steel Skin", "Armor", "Toughness"],
    c: 0
  },
  {
    q: "What is All Might's civilian name?",
    a: ["Toshinori Yagi", "Izuku Midoriya", "Sir Nighteye", "Neito Monoma"],
    c: 0
  },
  {
    q: "Which organization is known for training heroes at the school attended by Midoriya?",
    a: ["U.A. High School", "Shiketsu High School", "Ketsubutsu Academy", "Seiai Academy"],
    c: 0
  }
];

let current = 0;
let correct = 0;
let selected = null;
let studentName = "";

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const nameInput = document.getElementById("fullName");
const nameError = document.getElementById("nameError");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

document.getElementById("startBtn").onclick = () => {
  studentName = nameInput.value.trim();
  if (studentName.split(/\s+/).length < 2) {
    nameError.textContent = "Please enter your first and last name.";
    return;
  }
  nameError.textContent = "";
  current = 0;
  correct = 0;
  startScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  selected = null;
  nextBtn.classList.add("hidden");
  const item = questions[current];
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  questionEl.textContent = item.q;
  answersEl.innerHTML = "";

  item.a.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = answer;
    btn.onclick = () => {
      selected = index;
      document.querySelectorAll(".answer").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      nextBtn.classList.remove("hidden");
    };
    answersEl.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  if (selected === null) return;
  if (selected === questions[current].c) correct++;
  current++;
  if (current < questions.length) showQuestion();
  else showResults();
};

function showResults() {
  quizScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");

  const percentage = Math.round((correct / questions.length) * 100);
  let letter = percentage >= 90 ? "A" :
               percentage >= 80 ? "B" :
               percentage >= 70 ? "C" :
               percentage >= 60 ? "D" : "F";

  document.getElementById("resultName").textContent = studentName;
  document.getElementById("score").textContent = `${percentage}/100`;
  document.getElementById("grade").textContent =
    `${letter} • ${correct} out of ${questions.length} correct`;

  const record = {
    name: studentName,
    score: percentage,
    letter,
    correct,
    total: questions.length,
    date: new Date().toISOString()
  };

  const records = JSON.parse(localStorage.getItem("mhaScores") || "[]");
  records.push(record);
  localStorage.setItem("mhaScores", JSON.stringify(records));
}

document.getElementById("restartBtn").onclick = () => {
  resultsScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  nameInput.value = "";
};
