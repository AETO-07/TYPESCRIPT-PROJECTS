// type in ts used for defining the structure of an object or a variable. It allows us to specify the properties and their types that an object should have. This helps in catching errors during development and provides better code readability.
const questionContainer = document.getElementById("question")!;
const optionsContainer = document.getElementById("options")!;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
const resultContainer = document.getElementById("result")!;
const restart = document.getElementById("restartBtn") as HTMLButtonElement;
restart.style.display = "none";


type Question = {
    question: string,
    options: string[],
    answer: number
}

const quizData: Question[] = [
    {
        question: "Calculate 2 + 2",
        options: ["3", "4", "7", "6"],
        answer: 1
    },
    {
        question: "What is the capital of Nigeria?",
        options: ["Lagos", "Ekiti", "Abuja", "Kano"],
        answer: 2
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        answer: 0
    },
    {
        question: "Who is the current president of the United States?",
        options: ["Joe Biden", "Donald Trump", "Barack Obama", "George Bush"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function checkAnswer(
    selectedIndex: number,
    clickedBtn: HTMLButtonElement
){
    if (answered) return;
    answered = true;
    nextBtn.disabled = false;
    const ask = quizData[currentQuestion];
    if (selectedIndex === ask?.answer){
        score++;
        clickedBtn.style.backgroundColor = "green";
    }else{
        clickedBtn.style.backgroundColor = "red";
    }
    const allButtons = document.querySelectorAll(".optionBtn");
    allButtons.forEach((button) => {
    let btn =  (button as HTMLButtonElement)
    btn.disabled = true;
        if (Number(btn.dataset.index) === ask!.answer) {
            btn.style.backgroundColor = "green";
        }
    });
    console.log(score);
}

function renderQuestion(){
    const ask = quizData[currentQuestion]!;
    questionContainer.textContent = ask.question;
    optionsContainer.innerHTML = "";
    nextBtn.disabled = true;

    ask.options.forEach ((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("optionBtn");
        btn.dataset.index = index.toString();
        optionsContainer.appendChild(btn);
    btn.addEventListener("click", () => {
        checkAnswer(index, btn);
    });
    });
}

nextBtn.addEventListener("click", ()=> {
    currentQuestion++;
    answered = false;
    if (currentQuestion < quizData.length) {
        renderQuestion();    
    }else{
        showResult();
    }
});


function showResult(){
    const quiz = document.getElementById("quiz") as HTMLDivElement;
    quiz.style.display = "none";
    resultContainer.textContent = `You scored ${score}/${quizData.length}`;
    restart.style.display = "block";
}

restart.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;
    resultContainer.textContent = "";
    restart.style.display = "none";

    let quiz = document.getElementById("quiz") as HTMLDivElement;
    quiz.style.display = "block";
    renderQuestion();
});

renderQuestion();
