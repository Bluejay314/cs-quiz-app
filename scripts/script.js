let choiceType = "multiple";
let difficulty = "easy";

function loadQuizQuestion() {
    axios.get(`https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}&type=${choiceType}`)
        .then(response => {
            const data = response.data.results[0];
            console.log(data);
            
            const template = document.getElementById("template-quiz-card").content.cloneNode(true);
            template.querySelector(".card-title").innerText = data["question"];
            template.querySelector("#answer-a").innerText = data["incorrect_answers"][0];
            template.querySelector("#answer-b").innerText = data["incorrect_answers"][1];
            template.querySelector("#answer-c").innerText = data["correct_answer"];
            template.querySelector("#answer-d").innerText = data["incorrect_answers"][2];

            document.querySelector("body").appendChild(template);
            
        })
}

