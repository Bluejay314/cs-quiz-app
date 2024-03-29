
let previousScores = [2, 4, 5]; // Stores any atempt the player has made previously
let difficulty = "easy"; // easy, medium , hard
let numQuestions = 1;    // Number of questions that have been asked
let difficultyInc = 7;   // Difficulty changes after every multiple of this
let numCorrect = 0;      // Number of correct answers by the player
let numAttempts = 3;     // The number of attempts the user is allowed to fail
let selected;            // The question selected by the player
let correctAnswer;       // The correct answer to the current question

/*
  Sets the difficulty and fetches a question from the API. The data is loaded
  into a template and displayed.
*/
function loadQuizQuestion() {
    // Reset the displaying container to remove the last question
    document.body.innerHTML = "";
    
    // If the player has run out of attempts, reset the quiz
    if(numAttempts <= 0) {
        // Add the score to the list of previous scores
        previousScores.push(numCorrect);

        // Load the end page and build the chart
        const template = document.getElementById("template-quiz-end").content.cloneNode(true);
        template.querySelector("#final-score").innerText = numCorrect;
        document.querySelector("body").appendChild(template);
        makeChart();
    }
    else {
        // Add the loading element
        document.body.append(document.getElementById("template-spinner").content.cloneNode(true));
        let spinner = document.querySelector("#loading")
        spinner.style.display = "block";

        // Change the difficulty based on the number of questions answered
        if(numQuestions > difficultyInc*2)
        difficulty = "hard";
        else if(numQuestions > difficultyInc)
            difficulty = "medium";
        else 
            difficulty = "easy";

        // Fetch the next question based on the given difficulty
        axios.get(`https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}&type=multiple`)
            .then(response => {
                const data = response.data.results[0];

                console.log(data);
                console.log(`difficulty: ${difficulty}`);
                console.log(`answer: ${data["correct_answer"]}`);
                
                //This pools all options and randomly swaps their positions
                let options = [...data["incorrect_answers"], data["correct_answer"]];
                swapRandomElements(options, 8); 

                const template = document.getElementById("template-quiz-card").content.cloneNode(true);
                template.querySelector("#attempts-count").innerHTML = "&#10060".repeat(numAttempts);
                template.querySelector(".card-title").innerHTML = data["question"];
                template.querySelector("#answer-a").innerText = options[0];
                template.querySelector("#answer-b").innerText = options[1];
                template.querySelector("#answer-c").innerText = options[2];
                template.querySelector("#answer-d").innerText = options[3];
                template.querySelector("#answer-count").innerText = numCorrect;

                correctAnswer = data["correct_answer"];
                spinner.style.display = "none";
                document.querySelector("body").appendChild(template);
            })
            .catch(error => console.log(error));
    }
}

/*
  Highlights and stores the choice the player makes before submitting
*/
function onSelectEvent(event) {
    if(selected) selected.classList.remove("button-selected");

    event.target.classList.toggle("button-selected");
    selected = event.target;
}

/*
  Calls when the player hits the 'submit' button. It highlights the 
  correct answer, edits the stats, and allows the player to proceed 
  to the next question.
*/
function onAnswerSubmitEvent(event) {
    // If the user clicked the wrong answer, highlight it as wrong 
    // and deduct lives
    if(selected.innerText != correctAnswer) {
        selected.innerHTML += `<i class="fa-solid fa-xmark"></i>`;
        selected.classList.add("wrong-answer");
        document.querySelector("#outcome").innerText = "Wrong";
        numAttempts --;
    }
    // Otherwise the user is correct, and increase their streak
    else {
        document.querySelector("#outcome").innerText = "Correct!";
        numCorrect ++;
    }

    // In either case, highlight the correct answer
    document.querySelectorAll(".answer").forEach(e => {
        if(e.innerHTML == correctAnswer) {
            e.classList.add("correct-answer");
            e.innerHTML += `<i class="fa-solid fa-check"></i>`;
        }
    });

    numQuestions ++;
    document.querySelector("#attempts-count").innerHTML = "&#10060".repeat(numAttempts);
    document.querySelector("#answer-count").innerText = numCorrect;
    document.querySelector("#button-submit").style.display = "none";
    document.querySelector("#button-next").style.display = "inline-block";
}

function reset() {
    numQuestions = 1;
    numCorrect = 0;
    numAttempts = 3;
    selected = null;
    correctAnswer = "";
}

/*
  Takes an array, generates two random indeces, and swaps the elements at each.
  The function repeats 'numTimes' times.
*/
function swapRandomElements(arr, numTimes) {
    for(let i = 0; i < numTimes; i ++) {
        let ix1 = Math.floor(Math.random() * arr.length);
        let ix2 = Math.floor(Math.random() * arr.length);
        [arr[ix1], arr[ix2]] = [arr[ix2], arr[ix1]];
    }
}

function makeChart() {
    // Initialize the echarts instance based on the prepared dom
    const resultChart = echarts.init(document.getElementById('chart-display'));

    // Specify the configuration items and data for the chart
    let options = {
        title: {
            text: "Past Scores",
            left: "center"
        },
        xAxis: {
            type: 'category',
            show: false,
            // Generates a sequence of numbers equal to the number of scores
            data: previousScores.map((_, index) => index),
          },
        yAxis: {
            type: "value"
        },
        series: {
            name: 'Sales June',
            type: 'line',
            data: previousScores
        }               
    };

    resultChart.setOption(options);
}