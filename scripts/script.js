let choiceType = "multiple";
let difficulty = "easy";

async function loadQuizQuestion() {
    const question = await axios.get(`https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}&type=${choiceType}`);
    const data = question.data[0];

    const template = document.getElementById("template-quiz-card").content.cloneNode(true);
    template.querySelector(".card-title").innerText = data.question;
    template.querySelector("#answer-a").innerText

    document.querySelector("body").appendChild(template);
}

function RandomiseOrder(){
    return Math.floor(Math.random());
}