
  const questions =[
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyperlinks and Text Markup Language", correct:false},
            { text: "Hyper Text Markup Language", correct:true},
            { text: "Homelinks Text Maekup Language", correct:false},
            { text: "Home Tool Markup Language", correct:false},
        ]
    },
    {
        question: "What does CSS stand for??",
        answers: [
            { text: "Creative Style Sheets", correct:false},
            { text: "Computer Style Sheets", correct:false},
            { text: "Custom Style Sheets", correct:false},
            { text: "Cascading Style Sheets", correct:true},
        ]
    },
    {
        question: "Which is the correct command to display all records",
        answers: [
            { text: "lsa", correct:false},
            { text: "ls", correct:true},
            { text: "asa", correct:false},
            { text: "ala", correct:false},
        ]
    },
    {
        question: "What is the correct command to create a new React project?",
        answers: [
            { text: "npx create-react-app", correct:true},
            { text: "npm create-react-app", correct:false},
            { text: "npm create-react-app myReactApp", correct:false},
            { text: "npx create-react-app myReactApp", correct:false},
        ]
    },
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextbutton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
  }

  function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        
    });
  }

    function resetState(){
        nextbutton.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    } 
    
    function selectAnswer(e){
        const selectedBtn = e.target;
        const isCorrect = selectedBtn.dataset.correct === "true";
        if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
             }
             button.disabled = true;
        });
        nextbutton.style.display = "block";
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
        nextbutton.innerHTML = "Play Again";
        nextbutton.style.display = "block"
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    };

    nextbutton.addEventListener("click", () => {
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        } else {
            startQuiz();
        }
    } )

startQuiz();