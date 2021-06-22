//ELEMENTOS HTML
let triviaForm = document.getElementById("trivia");
let questionsContainer = document.getElementById("questionsContent");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let difficulty = document.getElementById("difficulty");
let type = document.getElementById("type");

let questionIndex = document.getElementById("question_index");
let numQuestions = document.getElementById("num_questions");
let btn1 = document.getElementById("1");
let btn2 = document.getElementById("2");
let btn3 = document.getElementById("3");
let btn4 = document.getElementById("4");

//VARIABLES DE CONTROL
let questions;
let qIndex = 0;
let correct_index_answer;
let correctAnswers = 0;

let inicio=0;
let timeout=0;
let result="";

// CONSTANTES
const LIMIT_TIME = "00:00:15";

//FUNCIONES
let getAPIData = e => {
  e.preventDefault();
  let url = `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      questions = data.results;
      startGame();        
    });
};

const startGame = () => {
  //console.log(questions);
  questionIndex.innerText = questions.length
  numQuestions.innerText = qIndex + 1;
  questionsContainer.style.display = "flex";
  triviaForm.style.display = "none";

  //Variable para controlar preguntas una por una
  let currentQuestion = questions[qIndex];
  document.getElementById("questionName").innerText = currentQuestion.question;

  if (currentQuestion.incorrect_answers.length == 1) {
    document.getElementById("1").innerText = "True";
    document.getElementById("2").innerText = "False";
    document.getElementById("3").style.display = "none";
    document.getElementById("4").style.display = "none";
  } else {
    document.getElementById("1").style.display = "Block";
    document.getElementById("2").style.display = "Block";
    document.getElementById("3").style.display = "Block";
    document.getElementById("4").style.display = "Block";

    correct_index_answer = Math.floor(Math.random() * 4) + 1;
    document.getElementById(correct_index_answer).innerText =
      currentQuestion.correct_answer;
    let j = 0;
    for (let i = 1; i <= 4; i++) {
      if (i === correct_index_answer) continue;
      document.getElementById(i).innerText =
        currentQuestion.incorrect_answers[j];
      j++;
    }
    //debugger;
  }

};

const nextQuestion = () => {
  if(qIndex < questions.length - 1){
    startStop();
    startStop();    
    qIndex += 1;
    startGame();   
  }else {
      alert(`Fin del juego... puntuacion ${correctAnswers} de ${questions.length} respuestas correctas. `);
      window.location.reload();
  }  
};

const response = (btn) => {
  if(btn.innerText === questions[qIndex].correct_answer){
    correctAnswers += 1;
    alert("¡Felicidades respuesta correcta!");
  }else {
    alert("¡Fallaste respuesta incorrecta!");
  };
  nextQuestion();
  
};

const responseBtn1 = () => {
  response(btn1);
};

const responseBtn2 = () => {
   response(btn2);
};

const responseBtn3 = () => {
   response(btn3);
};

const responseBtn4 = () => {
   response(btn4);
};

const startStop = () => {
    
  if(timeout==0){
        inicio=vuelta=new Date().getTime();
        start();
    }else{
        clearTimeout(timeout);
        timeout=0;
    }
}

const start = () => {
    let actual = new Date().getTime();
    let diff=new Date(actual-inicio);

    result=LeadingZero(diff.getUTCHours())+":"+LeadingZero(diff.getUTCMinutes())+":"+LeadingZero(diff.getUTCSeconds());
    document.getElementById('crono').innerText = result;

    if(result === LIMIT_TIME){
      nextQuestion();
    }

    timeout=setTimeout("start()",1000);

}

const LeadingZero = (Time) => {
    return (Time < 10) ? "0" + Time : + Time;
}

//LISTENERS
triviaForm.addEventListener("submit", getAPIData);

btn1.addEventListener("click", responseBtn1);
btn2.addEventListener("click", responseBtn2);
btn3.addEventListener("click", responseBtn3);
btn4.addEventListener("click", responseBtn4);