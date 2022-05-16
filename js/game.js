var sampleQuestion = {
    type: "image",
    image: "images/sampleImage.jpeg",
    incorrectAnswers: [
        "YA KNOW 1",
        "YA KNOW 2",
        "YA KNOW 3",
    ],
    correctAnswer: "YA KNOW 4",
};

var currentAnswer = "";
var currentProgress = 0;
var questionList = [
    sampleQuestion,
    sampleQuestion,
    sampleQuestion,
    sampleQuestion
];
var currentQuestionIndex = 0;



function questionBuilder(question) {
    var questionDiv;
    switch (question.type) {
        case "image":
            questionDiv = (imageQuestion(question));
            break;
    }
    var answersDiv = $("<div>");
    answersDiv.addClass("answers");
    var allAnswers = [];
    // Creates a div for each answer and adds it to the answersDiv
    for (var i = 0; i < question.incorrectAnswers.length; i++) {
        allAnswers.push(createAnswer(question.incorrectAnswers[i]));
    }
    allAnswers.push(createAnswer(question.correctAnswer));
    // Shuffles the answers
    allAnswers = shuffle(allAnswers);
    // Adds the answers to the answersDiv
    for (var i = 0; i < allAnswers.length; i++) {
        answersDiv.append(allAnswers[i]);
    }
    currentAnswer = question.correctAnswer;
    questionDiv.append(answersDiv);

    $("#game").append(questionDiv);

}

function createAnswer(answer) {
    var answerDiv = $("<div>");
    answerDiv.addClass("answer");
    answerDiv.text(answer);
    answerDiv.attr("data-answer", answer);
    answerDiv.on("click", function () {
        checkAnswer(this);
    });
    return answerDiv;
}

function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function imageQuestion(question) {
    var questionDiv = $("<div>");
    questionDiv.addClass("question").addClass("imageQuestion");
    var questionImage = $("<img>").addClass("questionImage");
    questionImage.attr("src", question.image);
    questionDiv.append(questionImage);
    return questionDiv;
}

function startGame(question) {
    $("#introScreen").addClass("closed");
    $("#progressBar").removeClass("hidden");
    currentProgress = 1;
    for (var tempQuestion in questionList) {
        questionLabelBuilder(parseInt(tempQuestion) + 1);
        questionBuilder(questionList[tempQuestion], "Question " + (parseInt(tempQuestion) + 1));
    }
    $(".question").addClass("hidden");
    // Removes hidden from first question 
    $(".question").first().removeClass("hidden");
    updateProgress();
}


function questionLabelBuilder(questionNumber) {
    var questionLabel = $("<div>");
    questionLabel.addClass("questionLabel");
    questionLabel.text(questionNumber);
    questionLabel.data("question-number", questionNumber);
    questionLabel.on("click", switchToQuestionFromBar);
    $("#questionsContainer").append(questionLabel);
}


function switchToQuestionFromBar() {
    var questionNumber = $(this).data("question-number");
    $(".question").addClass("hidden");
    $(".question").eq(questionNumber - 1).removeClass("hidden");
}


function checkIfCorrect(answer) {
    if (answer == currentAnswer) {
        return true;
    }
    return false;
}


function checkAnswer(answer) {
    answer = $(answer);
    var isCorrectAnswer = checkIfCorrect(answer.data("answer"));
    if (isCorrectAnswer) {
        correctAnswer(answer);
        return;
    }
    incorrectAnswer(answer);

}

function updateProgress() {
    var progressBar = $("#progressBarFill");
    progressBar.css("--current-progress", (currentProgress / questionList.length));
    var progress = $("#progress");
    progress.text(currentProgress + "/" + questionList.length);
    console.log(currentProgress / questionList.length);
}

function correctAnswer() {
    console.log("Correct answer");
    nextQuestion();
}

function incorrectAnswer() {
    console.log("Incorrect answer");
    nextQuestion();
}

function nextQuestion(previousQuestionCorrect) {
    // Removes any previous questions
    $(".question").remove();

    currentQuestionIndex++;
    if (currentQuestionIndex >= questionList.length) {
        endGame();
        return;
    }
    currentProgress++;
    updateProgress();
    questionBuilder(questionList[currentQuestionIndex]);
}

function endGame() {
    $("#endGameScreen").removeClass("closed");
}