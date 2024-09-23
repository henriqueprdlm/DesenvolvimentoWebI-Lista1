const taskInput = document.getElementById('task-input');
const listContainer = document.getElementById('list-container');
const searchInput = document.getElementById('search-input');
const body = document.body;
const toDoList = document.querySelector('.to-do-list');
const addTaskBox = document.querySelector('.add-task');
const imgTheme = document.getElementById('img-theme');

function addTask() {
    if (taskInput.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = taskInput.value;
        listContainer.appendChild(li);
        let removeButton = document.createElement('span');
        removeButton.innerHTML = '\u00d7';
        li.appendChild(removeButton);
    }

    taskInput.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem('data');
}

function filterTasks() {
    const filter = searchInput.value.toLowerCase();
    const tasks = listContainer.getElementsByTagName('li');

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].innerText || tasks[i].textContent;
        tasks[i].style.display = taskText.toLowerCase().includes(filter) ? '' : 'none';
    }
}

function changeTheme() {
    body.classList.toggle('dark');
    toDoList.classList.toggle('dark');
    addTaskBox.classList.toggle('dark');
    searchInput.classList.toggle('dark');
    body.classList.contains('dark') ? imgTheme.src = 'img/theme-light.png' : imgTheme.src = 'img/theme-dark.png';
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark': 'light');
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('dark');
        toDoList.classList.add('dark');
        addTaskBox.classList.add('dark');
        searchInput.classList.add('dark');
        imgTheme.src = 'img/theme-light.png';
    }
}

showTasks();
loadTheme();