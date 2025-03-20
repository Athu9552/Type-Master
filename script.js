// Get elements from the DOM
let randomText = document.getElementById("randomText");
let textInput = document.getElementById("textInput");
let result = document.getElementById("result");
let btn = document.getElementById("btn");
let btn1 = document.getElementById("btn1");
let timerDisplay = document.getElementById("timer");

let timerInterval;  // To store the interval ID
let startTime;
let endTime;

// Sentences array
let data = [
  "JavaScript is a scripting language that enables dynamic content.",
  "It also enables users to load content dynamically on a webpage.",
  "Such as dropdown menus, animations, and real-time updates.",
  "A scripting language used to create interactive web pages.",
  "How JavaScript works and why it is famous among developers."
];

// Function to calculate typing speed.
const myFunc = () => {
  let wordLength = textInput.value.trim().split(" ").length;
  let time = new Date();
  endTime = time.getTime();
  let completeTime = Math.floor((endTime - startTime) / 1000); // Time in seconds.
  let speed = Math.floor((wordLength / completeTime) * 60); // Words per minute.

  // Check for incorrect words
  let typedWords = textInput.value.trim().split(" ");
  let originalWords = randomText.innerHTML.trim().split(" ");
  let wrongWordCount = 0;

  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] !== originalWords[i]) {
      wrongWordCount++;
    }
  }

  // Display result.
  result.innerHTML = `You typed ${wordLength} words in ${completeTime} seconds. 
                      Your typing speed is ${speed} WPM. 
                      Wrong words: ${wrongWordCount}`;
};

// Function to start the timer.
function startTimer(duration) {
  let timeRemaining = duration;

  timerInterval = setInterval(() => {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;

    timerDisplay.textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    timeRemaining--;

    if (timeRemaining < 0) {
      clearInterval(timerInterval);
      textInput.disabled = true;
      textInput.style.backgroundColor = "rgb(245, 245, 245)";
      btn.innerText = "Start";
      myFunc();
      result.innerHTML += `<br>Time's up!`;
    }
  }, 1000);
}

// Start Button Logic.
btn.addEventListener("click", function () {
  if (btn.innerText === "Start") {
    // Clear previous text and results when starting a new test
    textInput.value = "";
    result.innerHTML = "";

    let time = new Date();
    startTime = time.getTime();
    btn.innerText = "Done";
    textInput.disabled = false;
    textInput.style.backgroundColor = "white";

    // Select a new random sentence
    let randomNum = Math.floor(Math.random() * data.length);
    randomText.innerHTML = data[randomNum];

    startTimer(30);  // Start 30-second timer
  } 
  else if (btn.innerText === "Done") {
    clearInterval(timerInterval);
    btn.innerText = "Start";
    textInput.disabled = true;
    textInput.style.backgroundColor = "rgb(245, 245, 245)";
    myFunc();
  }
});

// Restart Button Logic
btn1.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerDisplay.textContent = "00:30";  // Reset timer display to 30 seconds
  textInput.value = "";
  randomText.innerHTML = "";
  result.innerHTML = "";
  btn.innerText = "Start";
  textInput.disabled = true;
  textInput.style.backgroundColor = "rgb(245, 245, 245)";
});
