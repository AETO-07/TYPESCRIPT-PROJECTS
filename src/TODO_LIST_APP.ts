const input = document.getElementById("task") as HTMLInputElement;
const addbtn = document.getElementById("addbtn") as HTMLButtonElement;
const list = document.getElementById("taskList") as HTMLUListElement;
const searchInput = document.getElementById("searchinput") as HTMLInputElement;
const count = document.getElementById("taskCount") as HTMLParagraphElement;
const clearCompletedBtn = document.getElementById("clearCompletedBtn") as HTMLButtonElement;

//to store all tasks
let tasks: {text: string; done: boolean}[] = [];
let filter: "all" | "done" | "pending" = "all";
const saved = localStorage.getItem("tasks");

let searchText = "";
searchInput.addEventListener("input", () => {
    searchText = searchInput.value.toLowerCase();

    renderTasks();
});

if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
}

function deleteTask ( index: number){
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTask(index: number){
    if(!tasks[index])return; 
    console.log("before:", tasks[index]);
    
    tasks[index].done = !tasks[index].done;
        console.log("Clicked", index);

    renderTasks();
    
    // or just simply say tasks[index]!.done = !tasks[index]!.done
    //  it will work the same way as the one above
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearCompleted(){
    tasks = tasks.filter(task => !task.done);
    renderTasks();
    saveTasks();
}

clearCompletedBtn.addEventListener("click", () => {
    clearCompleted();
});



function editTask(index: number){
    const task = tasks[index];
    if(!task) return;
    const newText = prompt("Edit task:", task.text);

    if (!newText?.trim()) return;
    task.text = newText.trim();

    renderTasks();
    saveTasks();
}

function renderTasks(){
    list.innerHTML = "";
    tasks.forEach((task, index) => {
        if (filter === "done" && !task.done) return;
        if (filter === "pending" && task.done) return;

        const matchesSearch = task.text.toLowerCase().includes(searchText);
        
        if (!matchesSearch) return;
        console.log(task.text, matchesSearch);
        
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = task.text;

        if (task.done) {
            text.classList.add("completed");
        }

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔";
        doneBtn.classList.add("done-btn");
        doneBtn.addEventListener("click", () => toggleTask(index));

        const editbtn = document.createElement("button");
        editbtn.textContent = "✏️";
        editbtn.classList.add("editbtn")
        editbtn.addEventListener("click", () => {
            editTask(index);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            li.classList.add("fade-out");
            setTimeout(() => deleteTask(index), 300);
        });

        li.appendChild(text);
        li.appendChild(doneBtn);
        li.appendChild(editbtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);

        const remainingTasks = tasks.filter(task => !task.done).length;
        count.textContent = `${remainingTasks} task${remainingTasks !== 1 ? "s" : ""} remaining`;
    });

    saveTasks();
}
//  tenary operation:
// condition ? value_if_true : value_if_false
// so in my code i meant; if task.done === true, make a strike
// if task.done === false (or else), no strike
// let style:
// if (task.done) {
//     style = "line-through";
// } else {
//     style = "none"
// }

// to add tasks
addbtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (!task) return;

    tasks.push({text: task, done: false});
    renderTasks();
    input.value = "";
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter"){
        addbtn.click();
    }
});

// saving the task
(window as any).toggleTask = toggleTask;
(window as any).deleteTask = deleteTask;
