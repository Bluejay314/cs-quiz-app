let choiceType = "multiple";
let difficulty = "easy";
let selected;
let correctAnswer;

function loadQuizQuestion() {
    axios.get(`https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}&type=${choiceType}`)
        .then(response => {
            const data = response.data.results[0];
            let options = [...data["incorrect_answers"], data["correct_answer"]];
            swapRandomElements(options, 4);
            console.log(data["correct_answer"]);

            const template = document.getElementById("template-quiz-card").content.cloneNode(true);
            template.querySelector(".card-title").innerHTML = data["question"];
            template.querySelector("#answer-a").innerHTML = options[0];
            template.querySelector("#answer-b").innerHTML = options[1];
            template.querySelector("#answer-c").innerHTML = options[2];
            template.querySelector("#answer-d").innerHTML = options[3];

            correctAnswer = data["correct_answer"];
            document.querySelector("body").appendChild(template);
        })
}

function onSelectEvent(event) {
    if(selected)
        selected.classList.remove("button-selected");

    event.target.classList.toggle("button-selected");
    selected = event.target;
}

function onAnswerSubmitEvent(event) {
    if(selected.innerHTML == correctAnswer)
        console.log("correct");
    else
        console.log("wrong");
}

function swapRandomElements(arr, numTimes) {
    for(let i = 0; i < numTimes; i ++) {
        let ix1 = Math.floor(Math.random() * arr.length);
        let ix2 = Math.floor(Math.random() * arr.length);
        [arr[ix1], arr[ix2]] = [arr[ix2], arr[ix1]];
    }
}

