const taskInput = document.getElementById("taskInput");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

// LocalStorage se tasks nikalna (ya naya khali array banana)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Pehli baar page load hone par tasks dikhana
renderTasks();

// 1. ADD TASK
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    // Date aur Time nikalna
    const now = new Date();
    const timeString = now.toLocaleString('en-US', { 
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const newTask = {
        id: Date.now(), // Unique ID har task ke liye
        text: text,
        completed: false,
        time: timeString
    };

    tasks.push(newTask);
    taskInput.value = "";
    
    saveAndRender();
}

// Enter key se task add karna
taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

// 2. TOGGLE COMPLETE (Checkbox)
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveAndRender();
}

// 3. EDIT TASK
function editTask(id) {
    // Task dhundho
    const taskToEdit = tasks.find(task => task.id === id);
    if (!taskToEdit) return;

    // User se naya text pucho (purana text default dikhega)
    const newText = prompt("Edit your task:", taskToEdit.text);
    
    if (newText !== null && newText.trim() !== "") {
        taskToEdit.text = newText.trim();
        saveAndRender();
    }
}

// 4. DELETE TASK
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

// 5. RENDER TASKS (Screen par dikhana)
function renderTasks() {
    // Dono lists ko clear karo pehle
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    let completedCount = 0;

    tasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed-task");
            completedCount++;
        }

        li.innerHTML = `
            <div class="task-info">
                <input type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? "checked" : ""}>
                <div class="task-text-container">
                    <span class="task-text">${task.text}</span>
                    <span class="task-time">${task.time}</span>
                </div>
            </div>
            <div class="actions">
                <span class="action-btn edit-btn" onclick="editTask(${task.id})" title="Edit">✏️</span>
                <span class="action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete">🗑️</span>
            </div>
        `;

        // Check karke sahi list mein daalo
        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });

    updateProgress(completedCount, tasks.length);
}

// 6. UPDATE PROGRESS BAR
function updateProgress(done, total) {
    progressText.innerText = `${done} / ${total} tasks completed`;
    const percent = total === 0 ? 0 : (done / total) * 100;
    progressFill.style.width = percent + "%";
}

// 7. SAVE TO LOCAL STORAGE
function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// 8. LIGHT/DARK MODE TOGGLE
function toggleMode() {
    document.body.classList.toggle("dark");
}