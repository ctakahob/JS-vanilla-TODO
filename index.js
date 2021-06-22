const input = document.querySelector("#input");
const addBtn = document.querySelector("#btn_add");
const list = document.querySelector("#list");
const listDone = document.querySelector("#list_done");
const done_task = document.querySelector("#security-bar");
const done_bar = document.querySelector("#completed-bar");
let todos = [];

function checkPhoneKey(key) {
    if (key === "Enter") {
        return addTodo();
    } else if (key === "Escape") {
        input.value = "";
    }
}

function addTodo() {
    if (input.value.trim() !== "") {
        let todo = { text: input.value, completed: false, id: Date.now() };
        todos.push(todo);
        saveLocSt(todos);
        input.value = "";
        render();
    }
}

function saveLocSt(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadLocSt() {
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        render();
    }
}

function ButtonTodo() {
    addBtn.addEventListener("click", function(evt) {
        if (input.value == "") {
            return;
        } else {
            addTodo();
        }
    });
}

function render() {
    list_done.innerHTML = "";
    list.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todos[i].completed;
        checkbox.classList.add("cb");
        checkbox.addEventListener("click", changeTask);
        let span = document.createElement("span");
        let del = document.createElement("span");
        li.classList.add("new-item");
        li.id = todos[i].id;
        li.appendChild(checkbox);
        span.textContent = todos[i].text;
        span.addEventListener("dblclick", editTask);
        span.setAttribute(
            "title",
            "Dublclick to edit Task, Enter save, Esc to escape"
        );
        span.id = todos[i].id;
        li.appendChild(span);
        del.classList.add("del");
        del.textContent = "X";
        del.addEventListener("click", delTsk);
        li.appendChild(del);
        procBar();
        taskBar();

        todos[i].completed ? list_done.appendChild(li) : list.appendChild(li);
    }
}

function procBar() {
    let done = todos.filter((e) => e.completed === true);
    let undone = todos.filter((e) => e.completed === false);
    done_task.style.width =
        (done.length / (done.length + undone.length)) * 100 + "%";
}

function editTask(element) {
    let id = element.target.parentNode.id;
    li = element.target.parentNode;
    let span = element.target;
    let edit = document.createElement("input");
    let save = document.createElement("button");
    let cancel = document.createElement("button");
    li.removeChild(span);
    edit.setAttribute("type", "text");
    edit.setAttribute("onkeyup", "checkKey(event.key)");
    edit.classList.add("edTodo");
    edit.value = span.textContent;
    save.innerHTML = "save";
    save.setAttribute("onclick", "ediTodo()");
    cancel.innerHTML = "cancel";
    cancel.setAttribute("onclick", "render()");
    li.appendChild(edit);
    li.appendChild(save);
    li.appendChild(cancel);
    ediTodo = function() {
        if (edit.value !== span.textContent) {
            if ((element.id = id)) {
                span.textContent = edit.value;
                let find = todos.filter((e) => e.id == id);
                todos = todos.filter((e) => !find.includes(e));
                let editedtask = { text: edit.value, completed: false, id: element.id };
                console.log(editedtask);
                console.log(todos);
                todos.push(editedtask);
                saveLocSt(todos);
                render();
            }
            li.removeChild(edit);
            li.removeChild(save);
            li.removeChild(cancel);
            li.appendChild(span);
        } else {
            li.removeChild(edit);
            li.removeChild(save);
            li.removeChild(cancel);
            li.appendChild(span);
        }
    };
}

function checkKey(key) {
    if (key === "Enter") {
        return ediTodo();
    } else if (key === "Escape") {
        render();
    }
}

function delTsk(element) {
    let wTile = element.target.parentNode;
    wTile.className = "removed-item";
    let id = element.target.parentNode.id;
    let delitem = todos.filter((e) => e.id == id);
    todos = todos.filter((e) => !delitem.includes(e));
    procBar();
    taskBar();
    setTimeout(render, 1000);
    saveLocSt(todos);
}

function changeTask(element) {
    let id = element.target.parentNode.id;
    let find = todos.filter((e) => e.id == id);
    todos = todos.filter((e) => !find.includes(e));
    find[0].completed = !find[0].completed;
    todos.push(find[0]);
    saveLocSt(todos);
    render();
}

function taskBar() {
    let done = todos.filter((e) => e.completed === true);
    let undone = todos.filter((e) => e.completed === false);
    done_bar.style.width =
        (done.length / (done.length + undone.length)) * 100 + "%";
}

function shuffle() {
    todos.sort(() => Math.random() - 0.5);
    saveLocSt(todos);
    render();
}

function deleteAll() {
    let remAll = document.querySelector("#main-wrapper");
    remAll.className = "remov-all";
}

loadLocSt();