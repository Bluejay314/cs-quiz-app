let choiceType = "multiple";
let difficulty = "easy";
let selected;
let correctAnswer;

function loadQuizQuestion() {
    axios.get(`https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}&type=${choiceType}`)
        .then(response => {
            const data = response.data.results[0];
            
            const template = document.getElementById("template-quiz-card").content.cloneNode(true);
            template.querySelector(".card-title").innerHTML = data["question"];
            template.querySelector("#answer-a").innerHTML = data["incorrect_answers"][0];
            template.querySelector("#answer-b").innerHTML = data["incorrect_answers"][1];
            template.querySelector("#answer-c").innerHTML = data["correct_answer"];
            template.querySelector("#answer-d").innerHTML = data["incorrect_answers"][2];

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

