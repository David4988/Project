const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){ //checks if string is empty
        alert("You must write something!");
    }else{
        let li = document.createElement("li"); //creates HTML tag 'li'
        li.innerHTML = inputBox.value;         //all the text, input box recieves will go to 'li' tag
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(event){
    if(event.target.tagName === "LI"){
        event.target.classList.toggle("checked");
        saveData();
    }
    else if(event.target.tagName === "SPAN"){
        event.target.parentElement.remove();
        saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML); //stores the data in 'li' into 'data'
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();