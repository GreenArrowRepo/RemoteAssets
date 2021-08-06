


let parser;
let xml;

let question;
let questions;
let questionsArray;

let options;
let optionsArray;
let optionOne;
let optionTwo;
let optionThree;
let optionFour;

let answers;
let answersArray;

let selectedAnswer;

document.addEventListener('DOMContentLoaded', () => {

    let xmlUrl = "questions.xml";
    fetch(xmlUrl)
        .then(response => response.text())
        .then(xmlData => {

            console.log(xmlData);

            parser = new DOMParser();
            xml = parser.parseFromString(xmlData, "application/xml");

            getQuestionsFromXML(xml);
            getOptionsFromXML(xml);
            getAnswersFromXML(xml);
            
        });

})


function getQuestionsFromXML(x) {

    question = document.getElementById('question'); // get element from html file to display result

    questions = x.getElementsByTagName('q'); //get 'q' tag from xml file
    questionsArray = [];
    for (let i = 0; i < questions.length; i++) {
        questionsArray[i] = questions[i].firstChild.nodeValue;
    }

    question.innerHTML = questionsArray[0]; // show the first question by default

}

function getOptionsFromXML(x) {

    optionOne = document.getElementById('labelOpOne'); // get element from html file to display result
    optionTwo = document.getElementById('labelOpTwo');
    optionThree = document.getElementById('labelOpThree');
    optionFour = document.getElementById('labelOpFour');

    options = x.getElementsByTagName('option'); //get 'option' tag from xml file

    optionsArray = [];
    for (let i = 0; i < options.length; i++) {
        optionsArray[i] = options[i].firstChild.nodeValue;
    }
}

function getAnswersFromXML(x) {
    ans = document.getElementById('result');

    answers = x.getElementsByTagName('a');
    answersArray = [];
    for (let i = 0; i < answers.length; i++) {
        answersArray[i] = answers[i].firstChild.nodeValue;
    }
    
}


function showQuestion(buttonNumber,optionNumber) {

    clearSelectedRadio();

    question.innerHTML = questionsArray[buttonNumber];
    
    if (optionNumber < 3) {
        optionOne.innerHTML = optionsArray[buttonNumber];
        optionTwo.innerHTML = optionsArray[buttonNumber + 1];
        optionThree.innerHTML = optionsArray[buttonNumber + 2];
        optionFour.innerHTML = optionsArray[buttonNumber + 3];

        var setRadioValues = document.getElementsByName('answer');

        for (let i = 0; i < 4; i++) {
            setRadioValues[i].value = optionsArray[buttonNumber + i];

        }
    }
    else if (optionNumber > 3) {
        optionOne.innerHTML = optionsArray[optionNumber];
        optionTwo.innerHTML = optionsArray[optionNumber + 1];
        optionThree.innerHTML = optionsArray[optionNumber + 2];
        optionFour.innerHTML = optionsArray[optionNumber + 3];

        var setRadioValues = document.getElementsByName('answer');

        for (let i = 0; i < 4; i++) {
            setRadioValues[i].value = optionsArray[optionNumber + i];

        }

    }
}

function displayRadioValue() {
    var ele = document.getElementsByName('answer');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            selectedAnswer = ele[i].value;
        }
    }
    var gotAns = checkAnswer(selectedAnswer);
    if (gotAns)
        document.getElementById("result").innerHTML
            = "Correct!!";
    else
        document.getElementById("result").innerHTML
            = "Incorrect!!";

}

function checkAnswer(anss) {
    for (let i = 0; i < answersArray.length; i++) {
        if (anss == answersArray[i]) {
            return true;
        }
    }
}

function clearSelectedRadio() {
    var ele = document.getElementsByName("answer");
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            ele[i].checked = false;
    }
}





