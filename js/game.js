var currentAnswer = "";
var questionList = [{
        type: "image",
        image: "images/sampleImage.jpeg",
        correctAnswer: "How To Fake Your Own Death",
        incorrectAnswer: "How to Launder Money"
    },
    {
        type: "image",
        image: "images/sampleImage2.jpeg",
        correctAnswer: "How to Get Mental Peace",
        incorrectAnswer: "How to Make a Viral Tik Tok"
    },
    {
        type: "image",
        image: "images/sampleImage3.jpeg",
        correctAnswer: "How to Estimate Portion Size",
        incorrectAnswer: "How to Make Your Own Beer"
    },
    {
        type: "image",
        image: "images/sampleImage4.jpeg",
        correctAnswer: "How to Order a Healthy Brunch",
        incorrectAnswer: "How to Plate Your Food"
    },
    {
        type: "image",
        image: "images/sampleImage5.jpeg",
        correctAnswer: "How to Eat a Poptart",
        incorrectAnswer: "How to Use a Toaster"
    }
];

var answers = Array(questionList.length);
var currentQuestionIndex = 0;



function questionBuilder(question, questionNumber) {
    var questionDiv;


    switch (question.type) {
        case "image":
            questionDiv = (imageQuestion(question));
            break;
    }
    var answersDiv = $("<div>");
    answersDiv.addClass("answers");
    var allAnswers = [];
    allAnswers.push(createAnswer(question.correctAnswer, true));
    allAnswers.push(createAnswer(question.incorrectAnswer, false));
    // Picks a random number between 0 and 1
    var randomIndex = Math.floor(Math.random() * allAnswers.length);
    answersDiv.append(allAnswers[randomIndex]);
    allAnswers.splice(randomIndex, 1);
    answersDiv.append(allAnswers[0]);
    currentAnswer = question.correctAnswer;

    questionDiv.append(answersDiv);

    questionDiv.data("questionNumber", questionNumber);

    $("#game").append(questionDiv);
}

function createAnswer(answer, isCorrect) {
    var answerDiv = $("<div>");
    answerDiv.addClass("answer");
    answerDiv.text(answer);
    answerDiv.attr("data-answer", answer);
    if (isCorrect) {
        answerDiv.on("click", correctAnswer);
    } else {
        answerDiv.on("click", incorrectAnswer);
    }
    return answerDiv;
}



function imageQuestion(question) {
    var questionDiv = $("<div>");
    questionDiv.addClass("question").addClass("imageQuestion");
    var questionImage = $("<img>").addClass("questionImage");
    questionImage.attr("src", question.image);
    var questionBackgroundImage = $("<div>").addClass("questionBackgroundImage");
    questionBackgroundImage.css("background-image", "url(" + question.image + ")");
    questionDiv.append(questionImage).prepend(questionBackgroundImage);
    return questionDiv;
}

function startGame(question) {
    $("#introScreen").addClass("closed");
    $("#game").removeClass("hidden");
    for (var tempQuestion in questionList) {
        questionLabelBuilder(parseInt(tempQuestion) + 1);
        questionBuilder(questionList[tempQuestion], parseInt(tempQuestion) + 1);
        answers[tempQuestion] = null;
    }
    $(".question").addClass("hidden");
    // Removes hidden from first question 
    $(".question").first().removeClass("hidden");
    $(".questionLabel").first().addClass("active");
    $(".questionHeader").text("Question " + 1);
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
    $(".questionLabel").removeClass("active");
    $(".questionHeader").text("Question " + questionNumber);
    $(this).addClass("active");

    if (answers[questionNumber - 1] != null) {
        $("#nextButton").removeClass("hidden");
    } else {
        $("#nextButton").addClass("hidden");
    }
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


function correctAnswer() {
    if (answers[$(this).parent().parent().data("questionNumber") - 1] != null)
        return;
    $(this).addClass("correctAnswer");
    $(".questionLabel.active").addClass("correctAnswer");
    $(this).parent().parent().addClass("answered");
    answers[$(this).parent().parent().data("questionNumber") - 1] = true;
    $("#nextButton").removeClass("hidden");
}

function incorrectAnswer() {
    if (answers[$(this).parent().parent().data("questionNumber") - 1] != null)
        return;
    $(this).addClass("incorrectAnswer");
    // Gets the current question header and sets it to incorrect 
    $(".questionLabel.active").addClass("incorrectAnswer");
    $(this).parent().parent().addClass("answered");
    answers[$(this).parent().parent().data("questionNumber") - 1] = false;
    $("#nextButton").removeClass("hidden");
}

function nextQuestion(previousQuestionCorrect) {

}

function endGame() {
    $("#endGameScreen").removeClass("closed");
}