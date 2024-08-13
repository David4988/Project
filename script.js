const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
console.log("Double-tap to edit.");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    } else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        saveData();
    }
}, false);

listContainer.addEventListener("dblclick", function(event) {
    if (event.target.tagName === "LI") {
        let li = event.target;
        let originalText = li.innerText.replace('\u00d7', '').trim(); // Remove the delete button text before editing

        let input = document.createElement("input");
        input.type = "text";
        input.value = originalText;
        input.className = "edit-input";
        li.innerHTML = "";
        li.appendChild(input);
        input.focus();

        input.addEventListener("blur", function() {
            saveEdit(li, input.value);
        });

        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                saveEdit(li, input.value);
            }
        });
    }
});

function saveEdit(li, newText) {
    li.innerHTML = newText;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();

