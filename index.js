const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskPriority = document.getElementById('taskPriority');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    const now = new Date();

    tasks.sort((a, b) => {
        const priorityOrder = {
            High: 1,
            Medium: 2,
            Low: 3
        };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return new Date(a.date) - new Date(b.date);
    });

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.priority.toLowerCase();
        if (task.completed) li.classList.add('completed');
        if (new Date(task.date) < now && !task.completed) li.classList.add('overdue');

        li.innerHTML = `
      <span>
        ${task.task} - ${task.date} [${task.priority}]
      </span>
      <span>
        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </span>
    `;
        taskList.appendChild(li);
    });
}

// Add task
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const date = taskDate.value;
    const priority = taskPriority.value;

    if (!task || !date) return alert('Please enter task and date');

    tasks.push({
        task,
        date,
        priority,
        completed: false
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    taskDate.value = '';
    renderTasks();
});

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Toggle complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

renderTasks();


setInterval(renderTasks, 60000);
console.log("✅ Script connected");
