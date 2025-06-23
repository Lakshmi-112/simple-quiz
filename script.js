const questions=[
    {
        question:"What is HTML?",
        answers:[
            {text:"HTML describes the structure of a webpage",correct:false}, 
            {text:"HTML is the standard markup language mainly used to create web pages",correct:false},
            {text:"HTML consists of a set of elements that helps the browser how to view the content",correct:false},
            {text:"All of the mentioned",correct:true},
        ]
    },
    {
      question:"Who is the father of HTML?",
        answers:[
            {text:"Rasmus Lerdorf",correct:false}, 
            {text:" Tim Berners-Lee",correct:true},
            {text:"Brendan Eich",correct:false},
            {text:"Sergey Brin",correct:false},
        ]
    },
    {
          question:"HTML stands for __________",
        answers:[
            {text:"HyperText Markup Language",correct:true}, 
            {text:"HyperText Machine Language",correct:false},
            {text:"HyperText Marking Language",correct:false},
            {text:"HighText Marking Language",correct:false},
        ]
    },
    {
          question:"What is the correct syntax of doctype in HTML5?",
        answers:[
            {text:" /doctype html",correct:false}, 
            {text:" doctype html",correct:false},
            {text:" doctype html!",correct:false},
            {text:" !doctype html",correct:true},
        ]
    },
    {
          question:" In which part of the HTML metadata is contained?",
        answers:[
            {text:"html tag",correct:false}, 
            {text:"head tag",correct:true},
            {text:"title tag",correct:false},
            {text:"body tag",correct:false},
        ]
    },
]

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

 function resetState(){
    nextButton.style.display="";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
 }
 function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
 }

function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


 nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 })
startQuiz();
