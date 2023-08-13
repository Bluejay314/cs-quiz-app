let choiceType = "multiple";
let difficulty = "easy";

function getQuestion() {
    console.log("clicked");
    axios.get(`https://opentdb.com/api.php?amount=1&category=18&difficulty=${difficulty}&type=${choiceType}`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
}