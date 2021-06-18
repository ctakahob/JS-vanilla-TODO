let input = document.getElementById("input");
let addBtn = document.getElementById("btn_add");
let list = document.getElementById("list");
let listDone = document.getElementById("list_done");
let done_task = document.getElementById("security-bar");
let done_bar = document.getElementById("completed-bar");
let todos = [];

function checkPhoneKey(key) {
    if (key === "Enter") {
        return addTask();
    }
}

let addTask = function() {
    if (input.value.trim() !== "") {
        let todo = { text: input.value, check: false, id: new Date() };

        todos.push(todo);
        saveLS(todos);
        input.value = "";
        render();
    }
};

let saveLS = function(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
};

function loadLS() {
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        render();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    addBtn.addEventListener("click", function(evt) {
        if (input.value == "") {
            return;
        } else {
            addTask();
            console.log(todos);
        }
    });
});

let render = function() {
    list_done.innerHTML = "";
    list.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todos[i].check;
        checkbox.classList.add("cb");
        checkbox.addEventListener("click", changeTask);
        let span = document.createElement("span");
        let del = document.createElement("span");
        li.classList.add("new-item");
        li.id = todos[i].id;
        li.appendChild(checkbox);
        span.textContent = todos[i].text;
        span.addEventListener("dblclick", editTsk);
        span.id = todos[i].id;
        li.appendChild(span);
        del.classList.add("del");
        del.textContent = "X";
        del.addEventListener("click", delTsk);
        li.appendChild(del);
        bar();
        taskBar();

        todos[i].check ? list_done.appendChild(li) : list.appendChild(li);
    }
};
document.addEventListener("DOMContentLoaded", function() {
    render();
});

let editTsk = function(element) {
    let id = element.target.parentNode.id;
    li = element.target.parentNode;
    let span = element.target;
    let edit = document.createElement("input");
    li.removeChild(span);
    edit.setAttribute("type", "text");
    edit.setAttribute("onkeyup", "return checkKey(event.key)");
    edit.classList.add("edTodo");
    edit.value = span.textContent;
    li.appendChild(edit);
    ediTodo = function() {
        if (edit.value !== span.textContent) {
            if ((element.id = id)) {
                span.textContent = edit.value;
                let find = todos.filter((e) => e.id === id);
                todos = todos.filter((e) => !find.includes(e));
                let editedtask = { text: edit.value, check: false, id: element.id };
                todos.push(editedtask);
                saveLS(todos);
                render();
            }
            li.removeChild(edit);
            li.appendChild(span);
        }
    };
};

function checkKey(key) {
    if (key === "Enter") {
        return ediTodo();
    } else if (key === "Escape") {
        render();
    }
}

let delTsk = function(element) {
    let wTile = element.target.parentNode;
    wTile.className = "removed-item";
    let id = element.target.parentNode.id;
    let delitem = todos.filter((e) => e.id == id);
    todos = todos.filter((e) => !delitem.includes(e));
    bar();
    taskBar();
    setTimeout(render, 1000);
    saveLS(todos);
};

let changeTask = function(element) {
    let id = element.target.parentNode.id;
    let find = todos.filter((e) => e.id == id);
    todos = todos.filter((e) => !find.includes(e));
    find[0].check = !find[0].check;
    todos.push(find[0]);
    saveLS(todos);
    render();
};
let bar = function() {
    let done = todos.filter((e) => e.check === true);
    let undone = todos.filter((e) => e.check === false);
    done_task.style.width =
        (done.length / (done.length + undone.length)) * 100 + "%";
};

let taskBar = function() {
    let done = todos.filter((e) => e.check === true);
    let undone = todos.filter((e) => e.check === false);
    done_bar.style.width =
        (done.length / (done.length + undone.length)) * 100 + "%";
};

function shuffle() {
    todos.sort(() => Math.random() - 0.5);
    saveLS(todos);
    render();
}

loadLS();