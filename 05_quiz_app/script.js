const quiz = [
  {
    question: "Which team won the first IPL season in 2008?",
    options: [
      "Mumbai Indians",
      "Chennai Super Kings",
      "Rajasthan Royals",
      "Kolkata Knight Riders",
    ],
    ans: "Rajasthan Royals",
  },
  {
    question: "Who has scored the most runs in IPL history?",
    options: ["Virat Kohli", "Rohit Sharma", "David Warner", "Suresh Raina"],
    ans: "Virat Kohli",
  },
  {
    question: "Which bowler has taken the most wickets in IPL history?",
    options: [
      "Lasith Malinga",
      "Dwayne Bravo",
      "Amit Mishra",
      "Yuzvendra Chahal",
    ],
    ans: "Yuzvendra Chahal",
  },
  {
    question: "Which team has won the most IPL titles?",
    options: [
      "Mumbai Indians",
      "Chennai Super Kings",
      "Kolkata Knight Riders",
      "Sunrisers Hyderabad",
    ],
    ans: "Chennai Super Kings",
  },
  {
    question:
      "Who was the captain of Chennai Super Kings in the 2021 IPL final?",
    options: ["MS Dhoni", "Suresh Raina", "Ravindra Jadeja", "Faf du Plessis"],
    ans: "MS Dhoni",
  },
];

const startBtn = document.getElementById("start-btn");
const startContainer = document.getElementById("start-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const options = document.getElementById("options-container");
const displayScore = document.getElementById("score-text");
const resultContainer = document.getElementById("result-container");
const restartBtn = document.getElementById("restart-btn");

let currentIdx = 0;
let score = 0;

startBtn.addEventListener("click", () => {
  startContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  prevBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  options.innerHTML = "";
  questionText.textContent = "";
  questionText.textContent = quiz[currentIdx].question;
  let i = 1;
  quiz[currentIdx].options.forEach((option) => {
    const op = document.createElement("li");
    op.innerHTML = `
    <span>${i}) ${option}</span>
    `;
    i++;
    op.classList.add("option-item");
    op.addEventListener("click", () => checkAnswer(option));
    options.appendChild(op);
  });
}

function checkAnswer(option) {
  if (quiz[currentIdx].ans === option) {
    score++;
  } else return;
}

nextBtn.addEventListener("click", () => {
  currentIdx++;
  if (currentIdx >= quiz.length) showResult();
  showQuestion();
});

prevBtn.addEventListener("click", () => {
  if (currentIdx <= 0) {
    return;
  }
  currentIdx--;
  showQuestion();
});

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  displayScore.textContent = `you scored ${score} out of ${quiz.length}`;
}

restartBtn.addEventListener("click", () => {
  resultContainer.classList.add("hidden");
  score = 0;
  currentIdx = 0;
  startContainer.classList.remove("hidden");
  quizContainer.classList.add("hidden");
  //resultContainer.classList.add("hidden");
  prevBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
});
