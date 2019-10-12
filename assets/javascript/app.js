$(document).ready(function (){

    var timeleft = 30;
    var downloadTimer = setInterval(function(){
      document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
      timeleft -= 1;
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Time's Up!"
      }
    }, 1000);

    (function() {
        function buildQuiz() {
          var output = [];
      
          myQuestions.forEach((currentQuestion, questionNumber) => {
            var answers = [];
      
            for (letter in currentQuestion.answers) {
              answers.push(
                `<label>
                  <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
                </label>`
              );
            }
      
            output.push(
              `<div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>`
            );
          });
      
          quizContainer.innerHTML = output.join("");
        }
      
        function showResults() {
          var answerContainers = quizContainer.querySelectorAll(".answers");
      
          var numCorrect = 0;
      
          myQuestions.forEach((currentQuestion, questionNumber) => {
            var answerContainer = answerContainers[questionNumber];
            var selector = `input[name=question${questionNumber}]:checked`;
            var userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
            if (userAnswer === currentQuestion.correctAnswer) {
              numCorrect++;
      
              answerContainers[questionNumber].style.color = "lightgreen";
            } else {
              answerContainers[questionNumber].style.color = "red";
            }
          });
      
          resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        }
      
        var quizContainer = document.getElementById("quiz");
        var resultsContainer = document.getElementById("results");
        var submitButton = document.getElementById("submit");
        var myQuestions = [
          {
            question: "Which of the four houses is represented by a snake?",
            answers: {
              a: "Ravenclaw",
              b: "Slytherin",
              c: "Gryffindor",
              d: "Hufflepuff"
            },
            correctAnswer: "b"
          },
          {
            question: "What are the names of Harry Potter's parents?",
            answers: {
              a: "Unknown",
              b: "Severus Snape & Lily Potter",
              c: "James & Lily Potter",
              d: "Voldemort"
            },
            correctAnswer: "c"
          },
          {
            question: "What position does Harry play in Quidditch?",
            answers: {
              a: "Chaser",
              b: "Keeper",
              c: "Bludger",
              d: "Seeker"
            },
            correctAnswer: "d"
          },
          {
            question: "How did Harry get the scar on his forehead?",
            answers: {
                a: "Voldemort tried to kill him when he was a baby",
                b: "He was attacked by a Basilisk",
                c: "In a quidditch accident",
                d: "He crashed The Weasley's car into The Whomping Tree"
            },
            correctAnswer: "a"
          },
          {
              question: "How are Hogwarts students placed in their houses?",
              answers: {
                  a: "They're assigned by Professor Dumbledore",
                  b: "They get to pick which house they want to be in",
                  c: "The Sorting Hat",
                  d: "They're legacies, they're in the same house as their parents"
              },
              correctAnswer: "c"
          },
        ];
      
        buildQuiz();
      
        submitButton.addEventListener("click", showResults);
      })();

})