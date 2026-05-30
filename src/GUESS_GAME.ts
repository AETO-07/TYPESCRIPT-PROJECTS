let randomNumber: number = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);
let NumberOfAttempts: number = 0;
let maxAttempts:number = 5;
const submitButton = document.getElementById("check") as HTMLButtonElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;
const guestValue = document.getElementById("guessedNumber") as HTMLInputElement;
const result = document.getElementById("outcome") as HTMLParagraphElement;
let count = document.getElementById("count") as HTMLParagraphElement

submitButton.addEventListener("click", () => {
    const guess: number = Number(guestValue.value);
    if (!guess){
        result.innerHTML = "Enter a valid number!";
        return;
    }
    NumberOfAttempts++;
    count.innerHTML = `Attempts: ${NumberOfAttempts}`;
    if(guess === randomNumber){
        result.innerHTML = "Correct!, You go it in " + NumberOfAttempts + " attempts";
        submitButton.disabled = true;
    }else if (guess > randomNumber){
        result.innerHTML = "Too High!";
    }else{
        result.innerHTML = "Too Low!";
    }
    if (guess < 1 || guess > 100){
        result.innerHTML = "Enter number between 1 and 100";
    }
    if (NumberOfAttempts >= maxAttempts && guess !== randomNumber){
        result.innerHTML = `Game Over!, The number was ${randomNumber}`;
        submitButton.disabled = true;
    }
    if (NumberOfAttempts === 1 || NumberOfAttempts === 2){
        count.style.color = "Green";
    } else if(NumberOfAttempts === 3){
        count.style.color = "orange";
    }else{
        count.style.color = "red";
    }
});

resetButton.addEventListener("click", () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    NumberOfAttempts = 0;
    result.innerHTML = "";
    guestValue.value = "";
    submitButton.disabled = false;
    count.innerHTML = "";
});

