const firstNum = document.getElementById("firstnum") as HTMLInputElement;
const secondNum = document.getElementById("secondnum") as HTMLInputElement;
const result = document.getElementById("result") as HTMLParagraphElement;
const btn1 = document.getElementById("add") as HTMLButtonElement;
const btn2 = document.getElementById("minus") as HTMLButtonElement;
const btn3 = document.getElementById("product") as HTMLButtonElement;
const btn4 = document.getElementById("divide") as HTMLButtonElement;
const btn5 = document.getElementById("clear") as HTMLButtonElement;
// function to get numbers from inputs from users
function getInput(): [number, number]{
    return [Number(firstNum.value), Number(secondNum.value)];
}

function validateInputs(): boolean{
    if (firstNum.value === "" || secondNum.value === "") {
        result.innerText = "Input Value not complete!";
        return false;
    }
    return true;
}

// add
btn1.addEventListener("click", () => {
    if (!validateInputs())return;

    const [value1, value2] = getInput();
    result.innerText = `Result: ${value1 + value2}`;

});

//subtract
btn2.addEventListener("click", () => {
    if (!validateInputs())return;

    const [value1, value2] = getInput();
    result.innerText = `Result: ${value1 - value2}`;

});

//multiply
btn3.addEventListener("click", () => {
    if (!validateInputs())return;

    const [value1, value2] = getInput();
    result.innerText = `Result: ${value1 * value2}`;
});

//divide
btn4.addEventListener("click", () => {
    const [value1, value2] = getInput();
    if (!validateInputs())return;

    if(value2 === 0){
        result.innerText = "Cannot divide by zero!";
        return;
    }
    result.innerText = `Result: ${value1 / value2}`;
});

//clearbtn or restart
btn5.addEventListener("click", () => {
    firstNum.value = "";
    secondNum.value = "";
    result.innerText = "";
})

