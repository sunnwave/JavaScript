const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector("#todo-list");

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

if (savedTodoList) {
    for (i = 0; i < savedTodoList.length; i++) {
        createTodo(savedTodoList[i]);
    }
}

const createTodo = function (storageData) {

    let todoContents = todoInput.value;
    if (storageData) {
        todoContents = storageData.contents
    }

    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');

    newBtn.addEventListener('click', () => {
        newLi.classList.toggle('complete');
        saveItemsFunc();
    });

    newLi.addEventListener('dblclick', () => {
        newLi.remove();
        saveItemsFunc();
    });

    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = '';
    saveItemsFunc();
}

const keyCodeCheck = function () {
    if (window.event.keyCode === 13 && todoInput.value != '') {
        createTodo();
    }
};

const deleteAll = function () {
    const liList = document.querySelectorAll('li');
    for (let i = 0; i < liList.length; i++) {
        liList[i].remove();
    }
}

const saveItemsFunc = function () {
    const saveItems = [];
    for (let i = 0; i < todoList.children.length; i++) {
        const todoObj = {
            contents: todoList.children[i].querySelector("span").textContent,
            complete: todoList.children[i].classList.contains('complete')
        };
        saveItems.push(todoObj);
    }

    // console.log(typeof (JSON.stringify(saveItems)));
    localStorage.setItem('saved-items', JSON.stringify(saveItems));
};