const API_URL = "https://opentdb.com/api.php";
const DEFAULT_SETTINGS = {
  amount: 5,
  category: 9,
  difficulty: "easy",
  type: "multiple"
};

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;

async function fetchQuizQuestions(settings) {
  const url = new URL(API_URL);
  url.searchParams.set("amount", settings.amount);
  url.searchParams.set("category", settings.category);
  url.searchParams.set("difficulty", settings.difficulty);
  url.searchParams.set("type", settings.type);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

function loadQuestion() {
  const question = document.getElementById("question");
  const options = document.getElementsByClassName("btn");

  question.innerHTML = quizQuestions[currentQuestion].question;

  const answerOptions = quizQuestions[currentQuestion].incorrect_answers.concat(quizQuestions[currentQuestion].correct_answer);
  for (let i = 0; i < options.length; i++) {
    options[i].innerHTML = answerOptions[i];
    options[i].onclick = function() {
      checkAnswer(options[i].innerHTML);
    }
  }

  const timeLimit = 30;
  let timeLeft = timeLimit;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerHTML = timeLeft;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer(null);
    } else {
      timeLeft--;
      timerDisplay.innerHTML = timeLeft;
    }
  }, 1000);
}

function checkAnswer(selectedOption) {
  clearInterval(timer);

  const correctAnswer = quizQuestions[currentQuestion].correct_answer;
  if (selectedOption === correctAnswer) {
    score++;
    document.getElementById("result").innerHTML = "Correct!";
  } else {
    document.getElementById("result").innerHTML = "Wrong!";
  }

  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    const quizContainer = document.getElementsByClassName("quiz-container")[0];
    quizContainer.innerHTML = "<h2>Quiz Completed!</h2><p>Your final score is: " + score + "</p><button onclick='location.reload()'>Play Again</button>";
  }

  const scoreDisplay = document.getElementById("score");
  scoreDisplay.innerHTML = score;
}

async function startQuiz(settings) {
  quizQuestions = await fetchQuizQuestions(settings);
  loadQuestion();
}

window.onload = () => {
  startQuiz(DEFAULT_SETTINGS);
}
